import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.string().default('development'),
  APP_NAME: z.string().default('SHADOW AI'),
  APP_URL: z.string().default('http://localhost:4000'),
  JWT_SECRET: z.string().default('shadow-ai-dev-secret'),
  DEFAULT_USERNAME: z.string().default('admin'),
  DEFAULT_PASSWORD: z.string().default('shadow-ai'),
  ALLOWED_ORIGINS: z.string().default('http://localhost:4000,http://127.0.0.1:4000'),
  OPENAI_API_KEY: z.string().optional().default(''),
  OPENAI_BASE_URL: z.string().optional().default('https://api.openai.com/v1'),
  OPENAI_MODEL: z.string().default('gpt-4o-mini'),
  SEARCH_API_KEY: z.string().optional().default(''),
  SEARCH_ENGINE: z.string().default('tavily'),
  MAX_UPLOAD_SIZE_MB: z.coerce.number().default(10),
  SESSION_TTL_DAYS: z.coerce.number().default(30),
});

export const config = envSchema.parse(process.env);

export type Config = typeof config;
