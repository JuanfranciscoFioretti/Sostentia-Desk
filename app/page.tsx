// This page should not exist - handled by middleware
// But if it somehow runs, redirect to /en
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  redirect('/en');
}
