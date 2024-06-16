import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIGS } from './config';
import { PROVIDERS } from './providers';
import { MODULES } from '@modules/index';
@Module({
  imports: [...CONFIGS, ...PROVIDERS, ...MODULES],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
