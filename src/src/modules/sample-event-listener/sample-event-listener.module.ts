import { Module } from '@nestjs/common';
import { SampleEventListenerEventListener } from './sample-event-listener.event-listener';

@Module({
  providers: [SampleEventListenerEventListener],
  exports: [SampleEventListenerEventListener],
})
export class SampleEventListenerModule {}
