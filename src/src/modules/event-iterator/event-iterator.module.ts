import {
  Module,
  OnModuleInit,
  Logger,
  Inject,
  forwardRef,
} from '@nestjs/common';
import {
  EventHubConsumerClient,
  earliestEventPosition,
  ReceivedEventData,
} from '@azure/event-hubs';
import { EventProcessorInterface } from '../../common/interfaces/event-processor.interface';
import {
  EVENT_HUB_CLIENT,
  EVENT_HUB_PROCESSORS,
  REDIS_CLIENT,
} from '@constants';
import { SampleEventListenerModule } from '@modules/sample-event-listener/sample-event-listener.module';
import { SampleEventListenerEventListener } from '@modules/sample-event-listener/sample-event-listener.event-listener';
import Redis from 'ioredis';
import * as crypto from 'crypto';
import { ServiceBusSenderModule } from '@modules/queue-sender/queue-sender.module';

@Module({
  // Add more modules here to listen to events
  imports: [ServiceBusSenderModule, SampleEventListenerModule],
  providers: [
    SampleEventListenerEventListener,
    {
      provide: EVENT_HUB_PROCESSORS,
      useFactory: (...processors: EventProcessorInterface[]) => processors,
      inject: [SampleEventListenerEventListener],
    },
  ],
})
export class EventIteratorModule implements OnModuleInit {
  private readonly logger = new Logger(EventIteratorModule.name);

  constructor(
    @Inject(REDIS_CLIENT) private redisClient: Redis,
    @Inject(EVENT_HUB_CLIENT) private client: EventHubConsumerClient,
    @Inject(forwardRef(() => EVENT_HUB_PROCESSORS))
    private eventProcessors: EventProcessorInterface[],
  ) {}

  async onModuleInit() {
    this.logger.log('Subscribing to events...');

    this.client.subscribe(
      {
        processEvents: async (events, context) => {
          for (const event of events) {
            const hash = this.getEventHash(event);
            const isProcessed = await this.redisClient.get(hash);
            if (isProcessed) {
              continue;
            }

            this.logger.log(`Received event: ${JSON.stringify(event.body)}`);
            const listenersPromises = this.eventProcessors.map((processor) =>
              processor.processEvent(event.body),
            );
            await Promise.allSettled(listenersPromises);
            await this.redisClient.set(hash, 1, 'EX', 3600);

            // TODO implement checkpointing if this service is responsible for consuming events
            // TODO v2 implement in-memory cache to prevent same events being processed multiple times
          }
        },
        processError: async (err, context) => {
          this.logger.error(`Error: ${err.message}`);
        },
      },
      { startPosition: earliestEventPosition },
    );

    this.logger.log('Event subscription established.');
  }

  private getEventHash(event: ReceivedEventData) {
    const hash = crypto.createHash('sha256');
    const hashedData = [
      JSON.stringify(event.body),
      event.sequenceNumber,
      event.enqueuedTimeUtc.valueOf(),
    ].join('-');
    hash.update(hashedData);
    return hash.digest('hex');
  }
}
