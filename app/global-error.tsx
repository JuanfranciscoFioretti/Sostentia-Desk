'use client';

import { useCallback } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <html suppressHydrationWarning>
      <head>
        <title>Error</title>
      </head>
      <body style={{ padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '40px' }}>
          <h1 style={{ color: '#dc2626', marginBottom: '16px' }}>Oops! Something went wrong</h1>
          <p style={{ marginBottom: '24px', color: '#666' }}>
            We're sorry for the inconvenience. An unexpected error has occurred.
          </p>
          {error?.message && (
            <details style={{ marginBottom: '24px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Error details</summary>
              <p style={{ marginTop: '8px', fontSize: '12px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', overflow: 'auto' }}>
                {error.message}
              </p>
            </details>
          )}
          <button
            onClick={handleReset}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
