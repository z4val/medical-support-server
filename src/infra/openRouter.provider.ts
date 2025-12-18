import { OpenRouter } from '@openrouter/sdk';
import { ConfigService } from '@nestjs/config';

export const OPENROUTER_PROVIDER = 'OPENROUTER_PROVIDER';

export const OpenRouterProvider = {
  provide: OPENROUTER_PROVIDER,
  useFactory: (configService: ConfigService) => {
    return new OpenRouter({
      apiKey: configService.getOrThrow<string>('OPENROUTER_API_KEY'),
    });
  },
  inject: [ConfigService],
};
