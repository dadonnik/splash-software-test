import { Module } from '@nestjs/common';
import { SampleModuleEventListener } from './sample-module.event-listener';

@Module({
  providers: [SampleModuleEventListener],
  exports: [SampleModuleEventListener],
})
export class SampleModuleModule {}
