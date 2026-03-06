'use client';

export const dynamic = 'force-dynamic';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <title>Error</title>
      </head>
      <body style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: '600px', margin: '40px auto' }}>
          <h1 style={{ color: '#dc2626' }}>Oops! Something went wrong</h1>
          <p style={{ color: '#666', margin: '16px 0 24px' }}>
            We&apos;re sorry for the inconvenience.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
