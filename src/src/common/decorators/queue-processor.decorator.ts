import { SetMetadata } from '@nestjs/common';
import { SERVICE_BUS_PROCESSORS } from '@constants';

export function QueueProcessor(queueNames: string[]): ClassDecorator {
  return SetMetadata(SERVICE_BUS_PROCESSORS, queueNames);
}
