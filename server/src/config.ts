import { z } from 'zod';

export const configSchema = z.object({
  port: z.number().default(4000),
  nodeEnv: z.string().default('development'),
  appName: z.string().default('SHADOW AI'),
  appUrl: z.string().default('http://localhost:4000'),
  jwtSecret: z.string().default('change-me'),
  defaultUsername: z.string().default('admin'),
  defaultPassword: z.string().default('shadow-ai'),
  allowedOrigins: z.array(z.string()).default(['http://localhost:4000']),
  openAiApiKey: z.string().optional(),
  openAiBaseUrl: z.string().optional(),
  openAiModel: z.string().default('gpt-4o-mini'),
  searchApiKey: z.string().optional(),
  searchEngine: z.string().default('tavily'),
  maxUploadSizeMb: z.number().default(10),
  sessionTtlDays: z.number().default(30),
});

export const config = configSchema.parse({
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  appName: process.env.APP_NAME ?? 'SHADOW AI',
  appUrl: process.env.APP_URL ?? 'http://localhost:4000',
  jwtSecret: process.env.JWT_SECRET ?? 'change-me-in-production',
  defaultUsername: process.env.DEFAULT_USERNAME ?? 'admin',
  defaultPassword: process.env.DEFAULT_PASSWORD ?? 'shadow-ai',
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? 'http://localhost:4000').split(',').map((value) => value.trim()).filter(Boolean),
  openAiApiKey: process.env.OPENAI_API_KEY || undefined,
  openAiBaseUrl: process.env.OPENAI_BASE_URL || undefined,
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  searchApiKey: process.env.SEARCH_API_KEY || undefined,
  searchEngine: process.env.SEARCH_ENGINE || 'tavily',
  maxUploadSizeMb: Number(process.env.MAX_UPLOAD_SIZE_MB ?? 10),
  sessionTtlDays: Number(process.env.SESSION_TTL_DAYS ?? 30),
});
