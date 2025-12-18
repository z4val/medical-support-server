import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { OpenRouterProvider } from 'src/infra/openRouter.provider';

@Module({
  controllers: [AiController],
  providers: [AiService, OpenRouterProvider],
})
export class AiModule {}
