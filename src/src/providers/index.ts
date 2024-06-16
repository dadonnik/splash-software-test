import { DatabaseMongoProviderModule } from './mongoose/provider.module';
import { CloudAzureEventHubProviderModule } from './azure_event_hub/provider.module';

export const PROVIDERS = [
  DatabaseMongoProviderModule,
  CloudAzureEventHubProviderModule,
];
