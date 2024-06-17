import { Module } from '@nestjs/common';
import configuration from './configuration';
import { DatabaseRedisConfigService } from './configuration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string().default('redis'),
        REDIS_PORT: Joi.number().default(6379),
      }),
    }),
  ],
  providers: [ConfigService, DatabaseRedisConfigService],
  exports: [ConfigService, DatabaseRedisConfigService],
})
export class DatabaseRedisConfigModule {}
