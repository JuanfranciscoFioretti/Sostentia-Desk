import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <body className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
          <p className="text-gray-600 mb-8">La página que buscas no existe.</p>
          <Link href="/en" className="bg-blue-500 text-white px-6 py-2 rounded">
            Volver al inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
