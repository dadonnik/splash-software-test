import { EventProcessorInterface } from '../../common/interfaces/event-processor.interface';
import { Injectable, Logger } from '@nestjs/common';
import {
  EventDto,
  NotificationType,
} from '@modules/sample-event-listener/event.dto';
import { ServiceBusSenderService } from '@modules/queue-sender/queue-sender.service';
import { QUEUES } from '@constants';

@Injectable()
export class SampleEventListenerEventListener
  implements EventProcessorInterface
{
  constructor(private queueSender: ServiceBusSenderService) {}

  private readonly logger = new Logger(SampleEventListenerEventListener.name);

  async processEvent(eventBody: EventDto) {
    const notificationTypeToQueueMap = {
      [NotificationType.SMS]: QUEUES.SMS,
      [NotificationType.EMAIL]: QUEUES.EMAIL,
    };

    for (const notificationType of eventBody.notification) {
      const queueName = notificationTypeToQueueMap[notificationType];
      const queueMessage = {
        type: eventBody.type,
        metadata: eventBody.metadata,
      };

      this.queueSender.sendMessage(queueName, queueMessage);
    }
  }
}
