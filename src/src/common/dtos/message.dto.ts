import { Expose } from 'class-transformer';
import { IsString, IsInt, IsObject, IsDate } from 'class-validator';

export class MessageDTO {
  @Expose()
  @IsString()
  messageId: string;

  @Expose()
  @IsInt()
  timeToLive: number;

  @Expose()
  @IsInt()
  sequenceNumber: number;

  @Expose()
  @IsDate()
  enqueuedAt: Date;

  @Expose()
  @IsObject()
  body: any;
  static fromServiceBusMessage(message: any): MessageDTO {
    return {
      messageId: message.messageId,
      timeToLive: message.timeToLive,
      sequenceNumber: message.sequenceNumber.low,
      enqueuedAt: new Date(message.enqueuedTimeUtc),
      body: message.body,
    };
  }
}
