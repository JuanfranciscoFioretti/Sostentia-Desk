import { getAllPosts } from '@/lib/blog';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  try {
    const { locale } = await params;
    const posts = getAllPosts(locale);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
