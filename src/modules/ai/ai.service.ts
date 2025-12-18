import { Inject, Injectable } from '@nestjs/common';
import { OpenRouter } from '@openrouter/sdk';
import { AssistantMessage } from '@openrouter/sdk/models';

@Injectable()
export class AiService {
  constructor(@Inject('OPENROUTER_PROVIDER') private client: OpenRouter) {}

  //Test the client by sending a simple chat completion request
  private async getModelResponse(
    model: string,
    prompt: string,
  ): Promise<AssistantMessage | null> {
    const response = await this.client.chat.send({
      model: model || 'minimax/minimax-m2',
      messages: [
        { role: 'user', content: prompt || 'Explain quantum computing' },
      ],
    });

    if (!response.choices || response.choices.length === 0) {
      return null;
    }

    return response.choices[0].message;
  }

  async generateMedicalPrompt() {}
}
