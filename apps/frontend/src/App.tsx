import { useEffect, useState } from 'react';

export default function App() {
  const [message, setMessage] = useState<string>('Loading...');

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data: { message?: string }) => setMessage(data.message ?? 'No message'))
      .catch(() => setMessage('Static mode (backend offline)'));
  }, []);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 680, margin: '48px auto', padding: '0 20px' }}>
      <h1>CI/CD React + Node Demo</h1>
      <p>学号：2024210402002 ｜ 姓名：陈家浩 ｜ 班级：计算机244</p>
      <p data-testid="api-message">Backend status: {message}</p>
    </main>
  );
}
