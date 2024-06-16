import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseMongoConfigModule } from '../../config/database_mongo/configuration.module';
import { DatabaseMongoConfigService } from '../../config/database_mongo/configuration.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [DatabaseMongoConfigModule],
      useFactory: async (mongoConfigService: DatabaseMongoConfigService) => {
        return {
          uri: mongoConfigService.uri,
          retryAttempts: 5,
        };
      },
      inject: [DatabaseMongoConfigService],
    }),
  ],
})
export class DatabaseMongoProviderModule {}
