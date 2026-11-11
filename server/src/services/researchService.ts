import { randomUUID } from 'node:crypto';
import { loadStore, saveStore } from '../storage.js';
import type { Conversation, Message } from '../storage.js';

export function listConversations(): Conversation[] {
  const store = loadStore();
  return store.conversations.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function createConversation(title = 'New conversation'): Conversation {
  const store = loadStore();
  const now = new Date().toISOString();
  const conversation: Conversation = {
    id: randomUUID(),
    title,
    createdAt: now,
    updatedAt: now,
    messages: [],
  };

  store.conversations.unshift(conversation);
  saveStore(store);
  return conversation;
}

export function getConversation(id: string): Conversation | undefined {
  const store = loadStore();
  return store.conversations.find((conversation) => conversation.id === id);
}

export function addMessageToConversation(conversationId: string, role: Message['role'], content: string): Message {
  const store = loadStore();
  const conversation = store.conversations.find((item) => item.id === conversationId);
  if (!conversation) throw new Error('Conversation not found.');

  const message: Message = {
    id: randomUUID(),
    role,
    content,
    createdAt: new Date().toISOString(),
  };

  conversation.messages.push(message);
  conversation.updatedAt = new Date().toISOString();
  saveStore(store);
  return message;
}

export function updateConversationTitle(id: string, title: string): Conversation | undefined {
  const store = loadStore();
  const conversation = store.conversations.find((item) => item.id === id);
  if (!conversation) return undefined;

  conversation.title = title;
  conversation.updatedAt = new Date().toISOString();
  saveStore(store);
  return conversation;
}

export function deleteConversation(id: string): boolean {
  const store = loadStore();
  const before = store.conversations.length;
  store.conversations = store.conversations.filter((item) => item.id !== id);
  saveStore(store);
  return store.conversations.length !== before;
}

export function searchConversations(query: string): Conversation[] {
  const values = listConversations();
  const normalized = query.toLowerCase();
  return values.filter((conversation) => {
    const haystack = `${conversation.title} ${conversation.messages.map((message) => message.content).join(' ')}`.toLowerCase();
    return haystack.includes(normalized);
  });
}

export function exportConversation(id: string): string {
  const conversation = getConversation(id);
  if (!conversation) throw new Error('Conversation not found.');

  return JSON.stringify({
    id: conversation.id,
    title: conversation.title,
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
    messages: conversation.messages,
  }, null, 2);
}
