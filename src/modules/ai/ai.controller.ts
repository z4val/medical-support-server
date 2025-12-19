import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('AI-response')
  async getAIResponse(@Body('model') model?: string, @Body('prompt') prompt?: string) {
    return this.aiService.getResponse(model, prompt);
  }
}
