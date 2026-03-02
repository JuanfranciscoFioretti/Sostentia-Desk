import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  // Get English posts for static params
  const posts = getAllPosts('en');
  return posts.map((post) => ({
    locale: 'en',
    slug: post.slug,
  })).concat(
    getAllPosts('es').map((post) => ({
      locale: 'es',
      slug: post.slug,
    }))
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24">
      <Container size="md">
        <Link href={`/${locale}/blog`}>
          <Button variant="ghost" size="sm" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="primary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </header>

        {post.image && (
          <div className="aspect-video bg-muted rounded-2xl mb-12 flex items-center justify-center">
            <span className="text-muted-foreground">Featured Image</span>
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </Container>
    </article>
  );
}
