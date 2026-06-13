import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { BEDROCK_PROVIDER } from 'src/infra/bedrock.provider';
import { AiChatAdapter, ChatMessage } from './ai-chat.adapter';

@Injectable()
export class BedrockAdapter implements AiChatAdapter {
  constructor(@Inject(BEDROCK_PROVIDER) private readonly client: OpenAI) {}

  async completeChat(
    model: string,
    messages: ChatMessage[],
  ): Promise<string | null> {
    const completion = await this.client.chat.completions.create({
      model,
      messages,
    });

    return completion.choices[0]?.message?.content ?? null;
  }
}
