import { registerAs } from '@nestjs/config';
export default registerAs('cloud_azure', () => ({
  eventHubUri: process.env.AZURE_EVENTHUB_CONNECTION_STRING,
  eventHubName: process.env.AZURE_EVENTHUB_NAME,
  serviceBusUri: process.env.AZURE_SERVICE_BUS_CONNECTION_STRING,
}));
