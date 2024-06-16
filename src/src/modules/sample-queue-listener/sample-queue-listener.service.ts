import { Injectable, Logger } from '@nestjs/common';
import { QUEUES } from '@constants';
import { QueueProcessor } from '../../queue-processor.decorator';
import { QueueProcessorInterface } from '../../queue-processor.interface';

@QueueProcessor([QUEUES.EMAIL])
@Injectable()
export class SampleQueueListenerService implements QueueProcessorInterface {
  private readonly logger = new Logger(SampleQueueListenerService.name);
  async processMessage(queueName: string, message: any): Promise<void> {
    this.logger.log(
      `Processing message from ${queueName}: ${JSON.stringify(message)}`,
    );
  }
}
