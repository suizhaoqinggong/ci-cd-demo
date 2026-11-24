import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { app } from '../dist/server.js';

let server;
let baseUrl;

before(async () => {
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(() => {
  server?.close();
});

describe('Backend API', () => {
  it('GET /health returns 200 ok', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.equal(res.status, 200);
    assert.equal(await res.text(), 'ok');
  });

  it('GET /api/hello returns json message', async () => {
    const res = await fetch(`${baseUrl}/api/hello`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.message, 'Hello from ECS backend');
  });

  it('GET /api/version returns version string', async () => {
    const res = await fetch(`${baseUrl}/api/version`);
    assert.equal(res.status, 200);
    assert.ok((await res.text()).length > 0);
  });
});
