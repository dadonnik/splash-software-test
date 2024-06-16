import { Module } from '@nestjs/common';
import { ServiceBusSenderModule } from '@modules/queue-sender/queue-sender.module';
import { SampleQueueSenderService } from '@modules/sample-queue-sender/sample-queue-sender.service';

@Module({
  imports: [ServiceBusSenderModule],
  providers: [SampleQueueSenderService],
  exports: [SampleQueueSenderService],
})
export class SampleQueueSenderModule {}
