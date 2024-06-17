import {
  IsString,
  IsEnum,
  IsArray,
  IsDateString,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
}

class EventMetadataDto {
  @IsString()
  addedBy: string;

  @IsDateString()
  addedAt: string;
}

export class EventDto {
  @IsString()
  type: string;

  @IsArray()
  @IsEnum(NotificationType, { each: true })
  notification: NotificationType[];

  @IsObject()
  @ValidateNested()
  @Type(() => EventMetadataDto)
  metadata: EventMetadataDto;
}
