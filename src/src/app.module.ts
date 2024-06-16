import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIGS } from './config';
import { PROVIDERS } from './providers';
@Module({
  imports: [...CONFIGS, ...PROVIDERS],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
