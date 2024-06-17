import { Module } from '@nestjs/common';
import { SampleEventListenerEventListener } from './sample-event-listener.event-listener';
import { ServiceBusSenderModule } from '@modules/queue-sender/queue-sender.module';

@Module({
  imports: [ServiceBusSenderModule],
  providers: [SampleEventListenerEventListener],
  exports: [SampleEventListenerEventListener],
})
export class SampleEventListenerModule {}
