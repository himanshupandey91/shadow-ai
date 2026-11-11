import { randomUUID } from 'node:crypto';
import { loadStore, saveStore } from '../storage.js';

export type MemoryEntry = {
  id: string;
  content: string;
  source: string;
  consent: boolean;
  createdAt: string;
};

export function listMemories(): MemoryEntry[] {
  const store = loadStore();
  return store.memories;
}

export function addMemory(content: string, source: string, consent: boolean): MemoryEntry {
  const store = loadStore();
  const entry: MemoryEntry = {
    id: randomUUID(),
    content,
    source,
    consent,
    createdAt: new Date().toISOString(),
  };

  store.memories.unshift(entry);
  saveStore(store);
  return entry;
}

export function deleteMemory(id: string): void {
  const store = loadStore();
  store.memories = store.memories.filter((entry) => entry.id !== id);
  saveStore(store);
}

export function clearMemories(): void {
  const store = loadStore();
  store.memories = [];
  saveStore(store);
}
