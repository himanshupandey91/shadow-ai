import { callResearchSearch, type ChatMessage, callLlm } from './llmProvider.js';
import { generateResearchSummary } from '../services/fileProcessor.js';

export type ResearchResult = {
  question: string;
  summary: string;
  sources: { title: string; url: string; snippet: string }[];
};

export async function runResearch(question: string): Promise<ResearchResult> {
  const sources = await callResearchSearch(question);
  const summary = await generateResearchSummary(question, sources);

  try {
    const llmReply = await callLlm([
      { role: 'user', content: `Summarize the following research brief in one clear answer with citations. Research: ${JSON.stringify(sources)}` },
    ]);

    return {
      question,
      summary: llmReply.content || summary,
      sources,
    };
  } catch (error) {
    return {
      question,
      summary,
      sources,
    };
  }
}
