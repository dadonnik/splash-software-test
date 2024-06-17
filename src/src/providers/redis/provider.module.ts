import { Module, Global } from '@nestjs/common';
import { DatabaseRedisConfigModule } from '../../config/database_redis/configuration.module';
import { DatabaseRedisConfigService } from '../../config/database_redis/configuration.service';
import Redis, { RedisOptions } from 'ioredis';
import { REDIS_CLIENT } from '@constants';

@Global()
@Module({
  imports: [DatabaseRedisConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async (redisConfigService: DatabaseRedisConfigService) => {
        const redisOptions: RedisOptions = {
          host: redisConfigService.host,
          port: redisConfigService.port,
        };

        const client = new Redis(redisOptions);

        client.on('error', (err) => {
          console.error('Redis connection error:', err);
        });

        client.on('connect', () => {
          console.log('Connected to Redis');
        });

        return client;
      },
      inject: [DatabaseRedisConfigService],
    },
  ],
  exports: [REDIS_CLIENT],
})
export class DatabaseRedisProviderModule {}
