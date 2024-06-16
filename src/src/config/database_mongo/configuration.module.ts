import { Module } from '@nestjs/common';
import configuration from './configuration';
import { DatabaseMongoConfigService } from './configuration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MONGO_DB_USERNAME: Joi.string().default('root'),
        MONGO_DB_PASSWORD: Joi.string().default('12345'),
        MONGO_DB: Joi.string().default('splash_software_db'),
        MONGO_DB_HOST: Joi.string().default('mongodb'),
        MONGO_DB_PORT: Joi.number().default(27017),
        MONGO_DB_PARAMS: Joi.string().default('authSource=admin'),
      }),
    }),
  ],
  providers: [ConfigService, DatabaseMongoConfigService],
  exports: [ConfigService, DatabaseMongoConfigService],
})
export class DatabaseMongoConfigModule {}
