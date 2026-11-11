import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import { getSessionFromToken } from './storage.js';
import { config } from './config.js';

export function verifyAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '').trim();
  const session = getSessionFromToken(token);

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  req.user = { username: session.username };
  next();
}

export function login(username: string, password: string): { token: string } | null {
  if (username === config.defaultUsername && password === config.defaultPassword) {
    const token = randomUUID();
    const { createSession } = awaitImport('./storage.js');
    createSession(username);
    return { token };
  }

  return null;
}

async function awaitImport(path: string) {
  return (await import(path)) as typeof import('./storage.js');
}
