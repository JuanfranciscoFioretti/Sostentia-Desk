'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function LocaleError({ error, reset }: ErrorProps) {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '40px' }}>
        <h1 style={{ color: '#dc2626', marginBottom: '16px' }}>Something went wrong</h1>
        <p style={{ marginBottom: '24px', color: '#666' }}>
          An error occurred while rendering this page.
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
          onClick={() => reset()}
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
    </div>
  );
}
