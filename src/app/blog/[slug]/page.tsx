import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContentBySlug, getAllSlugs } from '@/lib/content';
import type { Post } from '@/types';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { MDXContent } from '@/components/mdx';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('posts');
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const postContent = getContentBySlug<Post>('posts', slug);

  if (!postContent) {
    notFound();
  }

  const { data: post, content } = postContent;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Back Link */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-accent/20 px-3 py-1 text-sm text-accent">
            {post.category}
          </span>
          {post.featured && (
            <span className="rounded-full bg-primary/20 px-3 py-1 text-sm text-primary">
              Featured
            </span>
          )}
        </div>

        <h1 className="mb-4 text-4xl font-medium text-foreground">{post.title}</h1>

        <p className="mb-6 text-lg text-card-foreground">{post.excerpt}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{post.readTime}</span>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <div key={tag} className="flex items-center gap-1 text-sm text-muted-foreground">
                <Tag size={14} />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <article>
        <MDXContent content={content} />
      </article>

      {/* Footer */}
      <footer className="mt-16 border-t border-border pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary transition-opacity hover:opacity-80"
        >
          <ArrowLeft size={16} />
          Back to all posts
        </Link>
      </footer>
    </div>
  );
}
