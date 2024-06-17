import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './message.model';
import { QueueMessageSaverListener } from './queue-message-saver.listener';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
  ],
  providers: [QueueMessageSaverListener],
  exports: [QueueMessageSaverListener],
})
export class QueueMessageSaverModule {}
