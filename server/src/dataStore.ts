import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
};

export type MemoryEntry = {
  id: string;
  content: string;
  source: string;
  consent: boolean;
  createdAt: string;
};

export type AppStore = {
  conversations: Conversation[];
  memories: MemoryEntry[];
};

const DATA_DIR = join(process.cwd(), 'server', 'data');
const STORE_PATH = join(DATA_DIR, 'store.json');

export function ensureStore(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!existsSync(STORE_PATH)) {
    const initial: AppStore = { conversations: [], memories: [] };
    writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2));
  }
}

export function loadStore(): AppStore {
  ensureStore();
  const raw = readFileSync(STORE_PATH, 'utf8');
  try {
    const parsed = JSON.parse(raw) as Partial<AppStore>;
    return {
      conversations: parsed.conversations ?? [],
      memories: parsed.memories ?? [],
    };
  } catch {
    return { conversations: [], memories: [] };
  }
}

export function saveStore(store: AppStore): void {
  ensureStore();
  writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}
