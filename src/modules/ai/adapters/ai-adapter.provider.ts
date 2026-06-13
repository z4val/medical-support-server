import { ConfigService } from '@nestjs/config';
import { OpenRouter } from '@openrouter/sdk';
import OpenAI from 'openai';
import { OPENROUTER_PROVIDER } from 'src/infra/openRouter.provider';
import { BEDROCK_PROVIDER } from 'src/infra/bedrock.provider';
import { AiChatAdapter } from './ai-chat.adapter';
import { BedrockAdapter } from './bedrock.adapter';
import { OpenRouterAdapter } from './openrouter.adapter';

export const AI_CHAT_ADAPTER = 'AI_CHAT_ADAPTER';

export const AiChatAdapterProvider = {
  provide: AI_CHAT_ADAPTER,
  useFactory: (
    configService: ConfigService,
    openRouterClient: OpenRouter,
    bedrockClient: OpenAI,
  ): AiChatAdapter => {
    const provider = configService.get<string>('AI_PROVIDER', 'openrouter');

    if (provider === 'bedrock') {
      return new BedrockAdapter(bedrockClient);
    }

    return new OpenRouterAdapter(openRouterClient);
  },
  inject: [ConfigService, OPENROUTER_PROVIDER, BEDROCK_PROVIDER],
};
