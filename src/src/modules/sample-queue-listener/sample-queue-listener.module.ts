import { Module } from '@nestjs/common';
import { ServiceBusSenderModule } from '@modules/queue-sender/queue-sender.module';
import { SampleQueueListenerService } from '@modules/sample-queue-listener/sample-queue-listener.service';

@Module({
  imports: [ServiceBusSenderModule],
  providers: [SampleQueueListenerService],
  exports: [SampleQueueListenerService],
})
export class SampleQueueListenerModule {}
