import { randomUUID } from 'node:crypto';
import type { Request, Response } from 'express';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export type FileAnalysisResult = {
  fileName: string;
  mimeType: string;
  size: number;
  text: string;
  summary: string;
  warnings: string[];
};

export async function extractTextFromFile(file: Express.Multer.File): Promise<FileAnalysisResult> {
  const safeFileName = file.originalname.replace(/[\r\n]+/g, '').trim();
  const warnings: string[] = [];

  if (!file.buffer || file.buffer.length === 0) {
    throw new Error('Uploaded file is empty.');
  }

  let text = '';
  let mimeType = file.mimetype || 'application/octet-stream';

  if (file.mimetype === 'application/pdf' || safeFileName.toLowerCase().endsWith('.pdf')) {
    const parsed = await pdfParse(file.buffer);
    text = parsed.text || '';
  } else if (
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    safeFileName.toLowerCase().endsWith('.docx')
  ) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    text = result.value || '';
  } else if (
    file.mimetype === 'text/plain' ||
    file.mimetype === 'text/csv' ||
    safeFileName.toLowerCase().endsWith('.txt') ||
    safeFileName.toLowerCase().endsWith('.csv')
  ) {
    text = file.buffer.toString('utf8');
  } else if (file.mimetype.startsWith('image/')) {
    text = `Image uploaded for AI vision analysis: ${safeFileName}. Requires a vision-capable model and configured provider.`;
    warnings.push('Image analysis is supported only with a configured vision-capable model.');
  } else {
    text = file.buffer.toString('utf8');
    warnings.push('Unknown file type processed as raw text.');
  }

  const normalized = text.replace(/\s+/g, ' ').trim();
  return {
    fileName: safeFileName,
    mimeType,
    size: file.size,
    text: normalized,
    summary: normalized.slice(0, 500) || 'No readable content found.',
    warnings,
  };
}

export async function generateResearchSummary(query: string, sources: { title: string; url: string; snippet: string }[]): Promise<string> {
  const citations = sources
    .map((source, index) => `(${index + 1}) ${source.title}: ${source.url}`)
    .join('\n');

  return `Deep research for "${query}" was prepared using available sources.\n\nSources:\n${citations}`;
}

export function makeResponseId(prefix = 'item') {
  return `${prefix}_${randomUUID()}`;
}

export function sanitizeUserInput(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, '').slice(0, 8000).trim();
}

export function safeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unexpected server error.';
}

export function validateTextFileType(file: Express.Multer.File): boolean {
  const name = file.originalname.toLowerCase();
  const allowed = [
    '.txt',
    '.csv',
    '.pdf',
    '.docx',
    '.png',
    '.jpg',
    '.jpeg',
    '.webp',
    '.gif',
  ];

  return allowed.some((extension) => name.endsWith(extension)) || file.mimetype.startsWith('image/') || file.mimetype.includes('pdf') || file.mimetype.includes('text') || file.mimetype.includes('csv') || file.mimetype.includes('word');
}
