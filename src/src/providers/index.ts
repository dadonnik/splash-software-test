import { DatabaseMongoProviderModule } from './mongoose/provider.module';
import { CloudAzureEventHubProviderModule } from './azure_event_hub/provider.module';
import { CloudAzureServiceBusProviderModule } from './azure_service_bus/provider.module';

export const PROVIDERS = [
  DatabaseMongoProviderModule,
  CloudAzureEventHubProviderModule,
  CloudAzureServiceBusProviderModule,
];
