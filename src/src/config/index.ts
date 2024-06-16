import { DatabaseMongoConfigModule } from './database_mongo/configuration.module';
import { CloudAzureConfigModule } from './cloud_azure/configuration.module';

export const CONFIGS = [DatabaseMongoConfigModule, CloudAzureConfigModule];
