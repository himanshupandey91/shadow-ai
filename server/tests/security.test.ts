import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../src/index.js';

const base = 'http://localhost';

test('health endpoint is available', async () => {
  const response = await fetch(`${base}/api/health`);
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.equal(data.status, 'ok');
});

test('login succeeds with default credentials', async () => {
  const response = await fetch(`${base}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'shadow-ai' }),
  });

  const data = await response.json();
  assert.equal(response.status, 200);
  assert.ok(data.token);
});

test('login fails with wrong password', async () => {
  const response = await fetch(`${base}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'wrong' }),
  });

  const data = await response.json();
  assert.equal(response.status, 401);
  assert.equal(data.error, 'Invalid credentials');
});

export { app };
