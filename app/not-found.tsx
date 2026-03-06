import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ padding: '20px', fontFamily: 'system-ui, sans-serif', textAlign: 'center', paddingTop: '80px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>404 - Page Not Found</h1>
        <p style={{ color: '#666', marginBottom: '32px' }}>The page you are looking for does not exist.</p>
        <Link
          href="/en"
          style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 24px', borderRadius: '6px', textDecoration: 'none' }}
        >
          Go Home
        </Link>
      </body>
    </html>
  );
}
