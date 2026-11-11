import { config } from './config.js';

export type LLMMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type LLMUsage = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
};

export type LLMResult = {
  content: string;
  provider: string;
  model: string;
  usage: LLMUsage;
};

export async function callLLM(messages: LLMMessage[]): Promise<LLMResult> {
  if (!config.OPENAI_API_KEY) {
    throw new Error('OpenAI-compatible API is not configured. Set OPENAI_API_KEY in the server environment.');
  }

  const response = await fetch(`${config.OPENAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: config.OPENAI_MODEL,
      messages,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`LLM request failed: ${response.status} ${text.slice(0, 250)}`);
  }

  const payload = (await response.json()) as any;
  const content = payload?.choices?.[0]?.message?.content ?? 'No response generated.';

  return {
    content,
    provider: 'openai-compatible',
    model: config.OPENAI_MODEL,
    usage: {
      promptTokens: payload?.usage?.prompt_tokens ?? 0,
      completionTokens: payload?.usage?.completion_tokens ?? 0,
      totalTokens: payload?.usage?.total_tokens ?? 0,
    },
  };
}

export async function searchWeb(query: string): Promise<Array<{ title: string; url: string; snippet: string }>> {
  if (!config.SEARCH_API_KEY) {
    return [
      {
        title: 'Search not configured',
        url: 'https://example.com/configuration',
        snippet: 'Set SEARCH_API_KEY to enable live web research. The app is ready for a real provider integration.',
      },
    ];
  }

  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.SEARCH_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      include_answer: true,
      include_raw_content: false,
      max_results: 5,
    }),
  });

  if (!response.ok) {
    throw new Error('Web search request failed.');
  }

  const payload = (await response.json()) as any;
  const items = payload?.results ?? [];
  return items.map((item: any) => ({
    title: item.title ?? 'Untitled result',
    url: item.url ?? '#',
    snippet: item.content ?? item.snippet ?? 'No snippet available',
  }));
}
