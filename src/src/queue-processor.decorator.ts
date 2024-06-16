import { SetMetadata } from '@nestjs/common';

export const QUEUE_PROCESSOR = 'QUEUE_PROCESSOR';

export function QueueProcessor(queueNames: string[]): ClassDecorator {
  return SetMetadata(QUEUE_PROCESSOR, queueNames);
}
