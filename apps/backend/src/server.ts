import express from 'express';
import { realpathSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const app = express();
const VERSION = process.env.APP_VERSION ?? '1.1.0';

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from ECS backend v1.1', version: VERSION });
});

app.get('/health', (_req, res) => {
  res.status(200).send('ok');
});

app.get('/api/version', (_req, res) => {
  res.send(String(VERSION));
});

const isMain = process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href;
if (isMain) {
  const port = Number(process.env.PORT ?? 3000);
  app.listen(port, '127.0.0.1', () => {
    console.log(`Backend listening on 127.0.0.1:${port}`);
  });
}
