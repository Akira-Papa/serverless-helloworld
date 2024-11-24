'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState<string>('Loading...');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('/api/hello');
        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        setError('APIの呼び出しに失敗しました');
        setMessage('');
      }
    };

    fetchMessage();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <h1 className="text-4xl font-bold">
          {message}
        </h1>
      )}
    </main>
  );
}
