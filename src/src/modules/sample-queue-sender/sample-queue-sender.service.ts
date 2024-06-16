import { Injectable, Logger } from '@nestjs/common';
import { ServiceBusSenderService } from '@modules/queue-sender/queue-sender.service';
import { QUEUES } from '@constants';

@Injectable()
export class SampleQueueSenderService {
  private readonly logger = new Logger(SampleQueueSenderService.name);

  constructor(private readonly serviceBusSender: ServiceBusSenderService) {}

  async sendToQueue(message: any) {
    this.logger.log(
      `Preparing to send message to queue: ${JSON.stringify(message)}`,
    );
    await this.serviceBusSender.sendMessage(QUEUES.EMAIL, message);
  }
}
