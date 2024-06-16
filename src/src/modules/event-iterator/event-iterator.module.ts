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
} from '@azure/event-hubs';
import { EventProcessorInterface } from '../../event-processor.interface';
import { EVENT_HUB_CLIENT, EVENT_HUB_PROCESSORS } from '@constants';
import { SampleModuleModule } from '@modules/sample-module/sample-module.module';
import { SampleModuleEventListener } from '@modules/sample-module/sample-module.event-listener';

@Module({
  // Add more modules here to listen to events
  imports: [SampleModuleModule],
  providers: [
    {
      provide: EVENT_HUB_PROCESSORS,
      useFactory: () => {
        // Add more listeners here to listen to events
        return [new SampleModuleEventListener()];
      },
    },
  ],
})
export class EventIteratorModule implements OnModuleInit {
  private readonly logger = new Logger(EventIteratorModule.name);

  constructor(
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
            this.logger.log(`Received event: ${JSON.stringify(event.body)}`);
            const listenersPromises = this.eventProcessors.map((processor) =>
              processor.processEvent(event.body),
            );
            await Promise.allSettled(listenersPromises);
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
}
