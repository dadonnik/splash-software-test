import { Module } from '@nestjs/common';
import { ServiceBusSenderService } from '@modules/queue-sender/queue-sender.service';

@Module({
  imports: [],
  providers: [ServiceBusSenderService],
  exports: [ServiceBusSenderService],
})
export class ServiceBusSenderModule {}
