export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AiChatAdapter {
  completeChat(model: string, messages: ChatMessage[]): Promise<string | null>;
}
