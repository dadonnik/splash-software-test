import { EventProcessorInterface } from '../../event-processor.interface';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SampleModuleEventListener implements EventProcessorInterface {
  private readonly logger = new Logger(SampleModuleEventListener.name);

  async processEvent(eventBody: any) {
    this.logger.log(
      `Sample module processing event: ${JSON.stringify(eventBody)}`,
    );
  }
}
