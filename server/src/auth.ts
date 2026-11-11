import crypto from 'node:crypto';

export type Session = {
  token: string;
  username: string;
  createdAt: string;
};

const sessions: Session[] = [];

export function createSession(username: string): string {
  const token = crypto.randomUUID();
  sessions.push({ token, username, createdAt: new Date().toISOString() });
  return token;
}

export function getSessionByToken(token?: string): Session | undefined {
  return sessions.find((session) => session.token === token);
}

export function revokeSession(token?: string): void {
  if (!token) return;
  const index = sessions.findIndex((session) => session.token === token);
  if (index >= 0) {
    sessions.splice(index, 1);
  }
}
