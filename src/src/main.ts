import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useAzureMonitor } from '@azure/monitor-opentelemetry';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: Configure logging/monitoring
  useAzureMonitor({
    enableLiveMetrics: true,
    enableStandardMetrics: true,
    enableTraceBasedSamplingForLogs: true,
    instrumentationOptions: {
      mongoDb: {
        enabled: true,
      },
      winston: {
        enabled: true,
      },
    },
  });

  await app.listen(3000);
}
bootstrap();
