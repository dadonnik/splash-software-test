import { Global, Logger, Module } from '@nestjs/common';
import { CloudAzureConfigModule } from '../../config/cloud_azure/configuration.module';
import { CloudAzureConfigService } from '../../config/cloud_azure/configuration.service';
import { SERVICE_BUS_CLIENT } from '@constants';
import { ServiceBusClient } from '@azure/service-bus';

@Global()
@Module({
  imports: [CloudAzureConfigModule],
  providers: [
    {
      provide: SERVICE_BUS_CLIENT,
      useFactory: async (configService: CloudAzureConfigService) => {
        const logger = new Logger('ServiceBusProviderModule');
        const connectionString = configService.serviceBusUri;
        const client = new ServiceBusClient(connectionString);

        logger.log('ServiceBusClient created and connected.');
        return client;
      },
      inject: [CloudAzureConfigService],
    },
  ],
  exports: [SERVICE_BUS_CLIENT],
})
export class CloudAzureServiceBusProviderModule {}
