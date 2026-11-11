import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { app } from '../src/index.js';

function createTestServer(): Promise<{ server: http.Server; baseUrl: string }> {
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const { port } = server.address() as any;
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

test('health endpoint returns ok', async () => {
  const { server, baseUrl } = await createTestServer();
  try {
    const response = await fetch(`${baseUrl}/api/health`);
    const data = await response.json();
    assert.equal(response.status, 200);
    assert.equal(data.status, 'ok');
  } finally {
    server.close();
  }
});

test('login succeeds with default credentials', async () => {
  const { server, baseUrl } = await createTestServer();
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'shadow-ai' }),
    });
    const data = await response.json();
    assert.equal(response.status, 200);
    assert.ok(data.token);
  } finally {
    server.close();
  }
});
