import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

export const BEDROCK_PROVIDER = 'BEDROCK_PROVIDER';

export const BedrockProvider = {
  provide: BEDROCK_PROVIDER,
  useFactory: (configService: ConfigService) => {
    const provider = configService.get<string>('AI_PROVIDER', 'openrouter');

    if (provider !== 'bedrock') {
      return new OpenAI({ baseURL: 'https://placeholder', apiKey: 'unused' });
    }

    return new OpenAI({
      baseURL: configService.getOrThrow<string>('AI_BASE_URL'),
      apiKey: configService.getOrThrow<string>('AI_API_KEY'),
    });
  },
  inject: [ConfigService],
};
