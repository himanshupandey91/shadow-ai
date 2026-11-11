import type { NextFunction, Request, Response } from 'express';
import { config } from './config.js';
import { createSession, getSessionByToken } from './dataStore.js';

export type AuthenticatedRequest = Request & {
  user?: { username: string };
};

export function login(username: string, password: string): { token: string; username: string } | null {
  if (username === config.DEFAULT_USERNAME && password === config.DEFAULT_PASSWORD) {
    return { token: createSession(username), username };
  }
  return null;
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '').trim();
  const session = getSessionByToken(token);

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  (req as AuthenticatedRequest).user = { username: session.username };
  next();
}
