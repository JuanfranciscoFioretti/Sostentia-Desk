import { notFound } from 'next/navigation';
import Link from 'next/link';
import { headers } from 'next/headers';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MobileFrame } from '@/components/ui/MobileFrame';
import { formatDate } from '@/lib/utils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { BlogPost } from '@/lib/blog';

export async function generateStaticParams() {
  // Return empty array to enable On-Demand ISR
  // Pages will be generated on first request
  return [];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const headersList = await headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;
  
  let post: BlogPost | null = null;
  try {
    const response = await fetch(`${baseUrl}/api/blog/${locale}/${slug}`, {
      cache: 'no-store'
    });
    if (response.ok) {
      post = await response.json();
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24">
      <Container size="md">
        <Link href={`/${locale}/blog`}>
          <Button variant="ghost" size="sm" className="mb-8 group transition-all duration-300 hover:bg-primary/10">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
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

        {post.displayMobileFrame ? (
          <div className="flex justify-center mb-12">
            <MobileFrame>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </MobileFrame>
          </div>
        ) : post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="aspect-video object-cover rounded-2xl mb-12 w-full"
          />
        ) : null}

        <div className="prose prose-xl dark:prose-invert max-w-none 
          prose-headings:mt-10 prose-headings:mb-6 prose-headings:font-bold
          prose-h2:text-3xl prose-h3:text-2xl
          prose-p:leading-8 prose-p:text-base prose-p:mb-6
          prose-li:leading-7 prose-li:text-base prose-li:my-3
          prose-ul:my-6 prose-ol:my-6
          prose-strong:font-bold prose-strong:text-foreground
          prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80
          prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-lg
          space-y-2">
          <MDXRemote source={post.content} />
        </div>
      </Container>
    </article>
  );
}
