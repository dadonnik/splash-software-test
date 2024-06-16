import { Module, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { SERVICE_BUS_CLIENT } from '@constants';
import { ServiceBusClient } from '@azure/service-bus';
import { SampleQueueListenerModule } from '@modules/sample-queue-listener/sample-queue-listener.module';
import { DiscoveryService, ModuleRef, Reflector } from '@nestjs/core';
import { QueueProcessorInterface } from '../../queue-processor.interface';
import { QUEUE_PROCESSOR } from '../../queue-processor.decorator';

@Module({
  imports: [SampleQueueListenerModule],
  providers: [DiscoveryService],
})
export class MessageIteratorModule implements OnModuleInit {
  private readonly logger = new Logger(MessageIteratorModule.name);
  constructor(
    @Inject(SERVICE_BUS_CLIENT) private client: ServiceBusClient,
    private discoveryService: DiscoveryService,
    private reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    this.logger.log('Subscribing to service bus...');

    const providers = this.discoveryService.getProviders();
    const queueToProcessorsMap: Record<string, QueueProcessorInterface[]> = {};

    for (const provider of providers) {
      if (
        !provider.metatype ||
        !this.reflector.get(QUEUE_PROCESSOR, provider.metatype)
      ) {
        continue;
      }

      const queueNames = this.reflector.get<string[]>(
        QUEUE_PROCESSOR,
        provider.metatype,
      );

      const processor = this.moduleRef.get<QueueProcessorInterface>(
        provider.metatype,
        { strict: false },
      );

      queueNames.forEach((queueName) => {
        if (!queueToProcessorsMap[queueName]) {
          queueToProcessorsMap[queueName] = [];
        }
        queueToProcessorsMap[queueName].push(processor);
      });
    }

    for (const [queueName, processors] of Object.entries(
      queueToProcessorsMap,
    )) {
      const receiver = this.client.createReceiver(queueName);

      receiver.subscribe({
        processMessage: async (message) => {
          this.logger.log(
            `Received message from ${queueName}: ${JSON.stringify(
              message.body,
            )}`,
          );
          const listenersPromises = processors.map((processor) =>
            processor.processMessage(queueName, message.body),
          );
          await Promise.allSettled(listenersPromises);
        },
        processError: async (err) => {
          this.logger.error(`Error on ${queueName}: ${err.error.message}`);
        },
      });

      this.logger.log(`Subscription to queue ${queueName} established.`);
    }

    this.logger.log('Service bus subscription established.');
  }
}
