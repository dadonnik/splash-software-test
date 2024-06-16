import { Injectable, Inject, Logger } from '@nestjs/common';
import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus';
import { SERVICE_BUS_CLIENT } from '@constants';

@Injectable()
export class ServiceBusSenderService {
  private readonly logger = new Logger(ServiceBusSenderService.name);
  private senders: { [queueName: string]: ServiceBusSender } = {};

  constructor(@Inject(SERVICE_BUS_CLIENT) private client: ServiceBusClient) {}

  getSender(queueName: string): ServiceBusSender {
    if (!this.senders[queueName]) {
      this.senders[queueName] = this.client.createSender(queueName);
      this.logger.log(`Created sender for queue: ${queueName}`);
    }
    return this.senders[queueName];
  }

  async sendMessage(queueName: string, message: any) {
    const sender = this.getSender(queueName);
    this.logger.log(
      `Sending message to queue ${queueName}: ${JSON.stringify(message)}`,
    );
    await sender.sendMessages({ body: message });
    this.logger.log(`Message sent to queue ${queueName}`);
  }
}
