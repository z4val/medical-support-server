import { Inject, Injectable } from '@nestjs/common';
import { OpenRouter } from '@openrouter/sdk';
import { OPENROUTER_PROVIDER } from 'src/infra/openRouter.provider';
import { AiChatAdapter, ChatMessage } from './ai-chat.adapter';

@Injectable()
export class OpenRouterAdapter implements AiChatAdapter {
  constructor(
    @Inject(OPENROUTER_PROVIDER) private readonly client: OpenRouter,
  ) {}

  async completeChat(
    model: string,
    messages: ChatMessage[],
  ): Promise<string | null> {
    const response = await this.client.chat.send({ model, messages });

    if (!response.choices?.length) {
      return null;
    }

    const content = response.choices[0].message?.content;
    if (typeof content === 'string') return content;
    return null;
  }
}
