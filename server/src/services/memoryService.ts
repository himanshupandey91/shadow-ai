import { config } from '../config.js';

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type LlmResponse = {
  content: string;
  provider: 'openai-compatible';
  model: string;
  usage: { promptTokens: number; completionTokens: number; totalTokens: number };
};

export async function callLlm(messages: ChatMessage[], options: { stream?: boolean } = {}): Promise<LlmResponse> {
  if (!config.openAiApiKey) {
    throw new Error('OpenAI-compatible API is not configured. Add OPENAI_API_KEY and OPENAI_BASE_URL in the server environment before using chat.');
  }

  const endpoint = (config.openAiBaseUrl || 'https://api.openai.com/v1') + '/chat/completions';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.openAiApiKey}`,
    },
    body: JSON.stringify({
      model: config.openAiModel,
      messages,
      stream: !!options.stream,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`LLM request failed (${response.status}): ${text.slice(0, 500)}`);
  }

  const payload = await response.json() as any;
  const content = payload?.choices?.[0]?.message?.content ?? 'No response generated.';

  return {
    content,
    provider: 'openai-compatible',
    model: config.openAiModel,
    usage: {
      promptTokens: payload?.usage?.prompt_tokens ?? 0,
      completionTokens: payload?.usage?.completion_tokens ?? 0,
      totalTokens: payload?.usage?.total_tokens ?? 0,
    },
  };
}

export async function callResearchSearch(query: string): Promise<{ title: string; url: string; snippet: string }[]> {
  if (!config.searchApiKey) {
    return [
      {
        title: 'Search not configured',
        url: 'https://example.com/configuration',
        snippet: 'Set SEARCH_API_KEY and SEARCH_ENGINE to enable live research. The app is ready for a real provider integration.',
      },
    ];
  }

  const endpoint = 'https://api.tavily.com/search';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.searchApiKey}`,
    },
    body: JSON.stringify({
      query,
      include_answer: true,
      include_raw_content: false,
      max_results: 5,
    }),
  });

  if (!response.ok) {
    throw new Error('Research provider request failed.');
  }

  const json = await response.json() as any;
  const results = json?.results ?? [];

  return results.map((result: any) => ({
    title: result.title ?? 'Untitled result',
    url: result.url ?? '#',
    snippet: result.content ?? result.snippet ?? 'No snippet available',
  }));
}
