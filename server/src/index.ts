import crypto from 'node:crypto';

export const makeId = (prefix = 'id') => `${prefix}_${crypto.randomUUID()}`;

export function sanitizeText(value: string, maxLength = 8000): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, '').slice(0, maxLength).trim();
}

export function safeErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return 'Unexpected server error.';
}

export function buildResearchSummary(question: string, sources: Array<{ title: string; url: string; snippet: string }>): string {
  const lines = sources
    .map((source, index) => `(${index + 1}) ${source.title}: ${source.url}\n${source.snippet}`)
    .join('\n\n');
  return `Deep research for: "${question}"\n\n${lines}`;
}
