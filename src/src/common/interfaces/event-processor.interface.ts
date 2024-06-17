export interface EventProcessorInterface {
  processEvent(eventBody: any): Promise<void>;
}
