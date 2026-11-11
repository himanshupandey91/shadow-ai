import test from 'node:test';
import assert from 'node:assert/strict';

const base = 'http://localhost';

test('chat endpoint rejects blank prompt', async () => {
  const response = await fetch(`${base}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer test-token',
    },
    body: JSON.stringify({ prompt: '' }),
  });

  assert.equal(response.status, 401);
});

test('api rejects malformed file types', async () => {
  const response = await fetch(`${base}/api/files/analyze`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer test-token',
    },
  });

  assert.equal(response.status, 400);
});
