import { Injectable, Logger } from '@nestjs/common';
import { MessageDTO } from '../dtos/message.dto';

@Injectable()
export abstract class AbstractQueueProcessor<T = void> {
  protected readonly logger: Logger;

  protected constructor(loggerName: string) {
    this.logger = new Logger(loggerName);
  }

  async processMessage(queueName: string, message: MessageDTO): Promise<void> {
    this.logger.log(
      `Processing message from ${queueName}: ${JSON.stringify(message)}`,
    );

    try {
      await this.handleMessage(queueName, message);
    } catch (error) {
      this.logger.error(
        `Error processing message from ${queueName}: ${JSON.stringify(
          message,
        )}`,
        error.stack,
      );
      throw error;
    }

    this.logger.log(
      `Finished processing message from ${queueName}: ${message.messageId}`,
    );
  }

  protected abstract handleMessage(
    queueName: string,
    message: MessageDTO,
  ): Promise<T>;
}
