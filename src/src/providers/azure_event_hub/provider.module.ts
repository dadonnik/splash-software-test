import { Global, Logger, Module } from '@nestjs/common';
import { CloudAzureConfigModule } from '../../config/cloud_azure/configuration.module';
import { CloudAzureConfigService } from '../../config/cloud_azure/configuration.service';
import { EventHubConsumerClient } from '@azure/event-hubs';
import { EVENT_HUB_CLIENT } from '@constants';

@Global()
@Module({
  imports: [CloudAzureConfigModule],
  providers: [
    {
      provide: EVENT_HUB_CLIENT,
      useFactory: async (configService: CloudAzureConfigService) => {
        const logger = new Logger('EventHubProviderModule');
        const connectionString = configService.eventHubUri;
        const consumerGroup = '$Default';
        const eventHubName = configService.eventHubName;

        console.log('connectionString', connectionString);
        const client = new EventHubConsumerClient(
          consumerGroup,
          connectionString,
          eventHubName,
        );

        logger.log('EventHubConsumerClient created and connected.');
        return client;
      },
      inject: [CloudAzureConfigService],
    },
  ],
  exports: [EVENT_HUB_CLIENT],
})
export class CloudAzureEventHubProviderModule {}
