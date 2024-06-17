import { EventIteratorModule } from '@modules/event-iterator/event-iterator.module';
import { SampleEventListenerModule } from '@modules/sample-event-listener/sample-event-listener.module';
import { SampleQueueSenderModule } from '@modules/sample-queue-sender/sample-queue-sender.module';
import { MessageIteratorModule } from '@modules/message-iterator/message-iterator.module';
import { QueueMessageSaverModule } from '@modules/queue-message-saver/queue-message-saver.module';

export const MODULES = [
  EventIteratorModule,
  SampleEventListenerModule,
  SampleQueueSenderModule,
  MessageIteratorModule,
  QueueMessageSaverModule,
];
