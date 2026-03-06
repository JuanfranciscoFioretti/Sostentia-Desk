import { redirect } from 'next/navigation';

// Marcar como dinámico para evitar problemas con prerendering
export const dynamic = 'force-dynamic';

export default function RootPage() {
  redirect('/en');
}
