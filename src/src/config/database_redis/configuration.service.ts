import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseRedisConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('database_redis.host');
  }

  get port(): number {
    return this.configService.get<number>('database_redis.port');
  }
}
