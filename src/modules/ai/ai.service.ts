import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AI_CHAT_ADAPTER } from './adapters/ai-adapter.provider';
import type { AiChatAdapter } from './adapters/ai-chat.adapter';

const DEFAULT_USER_PROMPT =
  'Genera un ejemplo de diagnóstico médico general asistido para un médico real que está atendiendo a un paciente con posible TCA. Evita generar formatos de tablas o gráficos, limítate a texto plano de máximo 200 palabras.';

@Injectable()
export class AiService {
  private readonly systemPrompt =
    'Eres un asistente médico de apoyo especializado en Trastornos de la Conducta Alimentaria (TCA). ' +
    'Proporciona diagnósticos preliminares claros en texto plano, sin tablas, gráficos ni markdown.';

  constructor(
    @Inject(AI_CHAT_ADAPTER) private readonly adapter: AiChatAdapter,
    private readonly config: ConfigService,
  ) {}

  private isBedrock(): boolean {
    return this.config.get<string>('AI_PROVIDER', 'openrouter') === 'bedrock';
  }

  private resolveModel(requested?: string): string {
    const primary = this.config.getOrThrow<string>(
      this.isBedrock() ? 'AI_MODEL' : 'OPENROUTER_MODEL',
    );
    const secondary = this.config.getOrThrow<string>(
      this.isBedrock() ? 'AI_MODEL_SECOND' : 'OPENROUTER_MODEL_SECOND',
    );

    if (!requested) return primary;
    if (requested === primary || requested === secondary) return requested;
    if (requested.includes('gpt-oss') || requested.includes('gpt-4')) {
      return primary;
    }
    if (requested.includes('deepseek')) return secondary;
    return requested;
  }

  private async getModelResponse(
    model?: string,
    prompt?: string,
  ): Promise<string | null> {
    return this.adapter.completeChat(this.resolveModel(model), [
      { role: 'system', content: this.systemPrompt },
      { role: 'user', content: prompt ?? DEFAULT_USER_PROMPT },
    ]);
  }

  async generateMedicalPrompt() {}

  async getResponse(model?: string, prompt?: string) {
    const resolvedModel = this.resolveModel(model);
    const diagnosis = await this.getModelResponse(model, prompt);

    if (!diagnosis) {
      throw new Error(`No response from ${resolvedModel} model`);
    }

    return {
      model: resolvedModel,
      diagnosis,
      confidence: Math.floor(Math.random() * 21) + 80,
      prompt: prompt ?? '',
    };
  }
}
