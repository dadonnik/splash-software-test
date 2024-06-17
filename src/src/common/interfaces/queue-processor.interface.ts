export interface QueueProcessorInterface {
  processMessage(queueName: string, message: any): Promise<void>;
}
