import Link from 'next/link';
import { headers } from 'next/headers';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/lib/blog';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const headersList = await headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;
  
  let posts: BlogPost[] = [];
  try {
    const response = await fetch(`${baseUrl}/api/blog/${locale}`, {
      cache: 'no-store'
    });
    if (response.ok) {
      posts = await response.json();
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  return (
    <section className="pt-32 pb-24">
      <Container>
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4">
            Blog & Resources
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest Insights</h1>
          <p className="text-lg text-muted-foreground">Stay updated with tips, tutorials, and industry news</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
                <Card className="h-full flex flex-col">
                  {post.image && (
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-muted-foreground">Image</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
