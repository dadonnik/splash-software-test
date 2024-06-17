import { Schema, Document } from 'mongoose';

export const EventSchema = new Schema(
  {
    queueName: {
      type: String,
      required: true,
    },
    messageId: {
      type: String,
      required: true,
    },
    body: {
      type: Schema.Types.Mixed,
      required: true,
    },
    enqueuedAt: {
      type: Date,
      required: true,
    },
    sequenceNumber: {
      type: Number,
      required: false,
    },
    timeToLive: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);
export interface EventDocument extends Document {
  queueName: string;
  messageId: string;
  body: any;
  enqueuedAt: Date;
  sequenceNumber?: number;
  timeToLive?: number;
}
