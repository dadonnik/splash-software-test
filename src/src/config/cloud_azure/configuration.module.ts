import { Module } from '@nestjs/common';
import configuration from './configuration';
import { CloudAzureConfigService } from './configuration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        AZURE_EVENTHUB_CONNECTION_STRING: Joi.string(),
        AZURE_EVENTHUB_NAME: Joi.string(),
        AZURE_SERVICEBUS_CONNECTION_STRING: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, CloudAzureConfigService],
  exports: [ConfigService, CloudAzureConfigService],
})
export class CloudAzureConfigModule {}
