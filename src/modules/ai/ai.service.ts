import { Inject, Injectable } from '@nestjs/common';
import { OpenRouter } from '@openrouter/sdk';
import { AssistantMessage } from '@openrouter/sdk/models';

@Injectable()
export class AiService {
  constructor(@Inject('OPENROUTER_PROVIDER') private client: OpenRouter) {}

  //Test the client by sending a simple chat completion request
  private async getModelResponse(
    model?: string,
    prompt?: string,
  ): Promise<AssistantMessage | null> {
    const response = await this.client.chat.send({
      model: model || 'openai/gpt-oss-120b:free',
      messages: [
        {
          role: 'user',
          content:
            prompt ||
            'Genera un ejemplo de diagnóstico médico general asistido para un médico real que está atendiendo a un paciente con posible TCA. Evita generar formatos de tablas o gráficos, limítate a texto plano de máximo 200 palabras.',
        },
      ],
    });

    if (!response.choices || response.choices.length === 0) {
      return null;
    }

    return response.choices[0].message;
  }

  async generateMedicalPrompt() {}

  async getResponse(model?: string) {
    const diagnosis = await this.getModelResponse(model);
    if (!diagnosis || !diagnosis.content) {
      throw new Error('No response from OpenAI model');
    }
    return {
      model: model || 'openai/gpt-oss-120b:free',
      diagnosis: diagnosis.content,
      confidence: 0.95,
      prompt: '',
    };
  }
}
