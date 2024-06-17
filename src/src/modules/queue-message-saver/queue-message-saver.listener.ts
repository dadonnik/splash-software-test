import { Injectable } from '@nestjs/common';
import { QueueProcessorInterface } from '../../common/interfaces/queue-processor.interface';
import { QueueProcessor } from '../../common/decorators/queue-processor.decorator';
import { QUEUES } from '@constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from '@modules/queue-message-saver/message.model';
import { MessageDTO } from '../../common/dtos/message.dto';
import { AbstractQueueProcessor } from '../../common/abstract/abstract.queue-processor';

@Injectable()
@QueueProcessor(Object.values(QUEUES))
export class QueueMessageSaverListener
  extends AbstractQueueProcessor<EventDocument>
  implements QueueProcessorInterface
{
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<EventDocument>,
  ) {
    super(QueueMessageSaverListener.name);
  }

  protected async handleMessage(
    queueName: string,
    message: MessageDTO,
  ): Promise<EventDocument> {
    const event = new this.eventModel({
      queueName,
      messageId: message.messageId,
      body: message.body,
      enqueuedAt: message.enqueuedAt,
      timeToLive: message.timeToLive,
      sequenceNumber: message.sequenceNumber,
    });

    this.logger.log(`Saving event from ${queueName}: ${message.messageId}`);
    return event.save();
  }
}
