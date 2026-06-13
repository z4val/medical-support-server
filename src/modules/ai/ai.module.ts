import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { OpenRouterProvider } from 'src/infra/openRouter.provider';
import { BedrockProvider } from 'src/infra/bedrock.provider';
import { AiChatAdapterProvider } from './adapters/ai-adapter.provider';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    OpenRouterProvider,
    BedrockProvider,
    AiChatAdapterProvider,
  ],
})
export class AiModule {}
