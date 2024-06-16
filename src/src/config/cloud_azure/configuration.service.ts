import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudAzureConfigService {
  constructor(private configService: ConfigService) {}
  get eventHubUri(): string {
    return this.configService.get<string>('cloud_azure.eventHubUri');
  }

  get eventHubName(): string {
    return this.configService.get<string>('cloud_azure.eventHubName');
  }
}
