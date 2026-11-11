import { randomUUID } from 'node:crypto';
export type FileAnalysisResult = {
  fileName: string;
  mimeType: string;
  size: number;
  text: string;
  summary: string;
  warnings: string[];
};

export async function generateResearchSummary(question: string, sources: { title: string; url: string; snippet: string }[]): Promise<string> {
  const citations = sources
    .map((source, index) => `(${index + 1}) ${source.title} — ${source.url}`)
    .join('\n');

  return `Research summary for: "${question}"\n\n${citations}`;
}

export function makeResponseId(prefix = 'task') {
  return `${prefix}_${randomUUID()}`;
}
