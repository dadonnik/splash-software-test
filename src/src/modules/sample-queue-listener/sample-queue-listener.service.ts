import { Injectable } from '@nestjs/common';
import { QUEUES } from '@constants';
import { QueueProcessor } from '../../common/decorators/queue-processor.decorator';
import { QueueProcessorInterface } from '../../common/interfaces/queue-processor.interface';
import { AbstractQueueProcessor } from '../../common/abstract/abstract.queue-processor';
import { MessageDTO } from '../../common/dtos/message.dto';

@QueueProcessor([QUEUES.EMAIL])
@Injectable()
export class SampleQueueListenerService
  extends AbstractQueueProcessor
  implements QueueProcessorInterface
{
  constructor() {
    super(SampleQueueListenerService.name);
  }

  protected handleMessage(
    queueName: string,
    message: MessageDTO,
  ): Promise<void> {
    return null;
  }
}
