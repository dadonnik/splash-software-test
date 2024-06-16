import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseMongoConfigService {
  constructor(private configService: ConfigService) {}

  get username(): string {
    return this.configService.get<string>('database_mongo.username');
  }

  get password(): string {
    return this.configService.get<string>('database_mongo.password');
  }

  get database(): string {
    return this.configService.get<string>('database_mongo.database');
  }

  get host(): string {
    return this.configService.get<string>('database_mongo.host');
  }

  get port(): string {
    return this.configService.get<string>('database_mongo.port');
  }

  get params(): string {
    return this.configService.get<string>('database_mongo.params');
  }

  get uri(): string {
    return `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}?${this.params}`;
  }
}
