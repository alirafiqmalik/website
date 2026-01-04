import Link from 'next/link';
import { getAllContent } from '@/lib/content';
import type { Post } from '@/types';
import { Calendar, Clock, Tag } from 'lucide-react';

export default function BlogPage() {
  const posts = getAllContent<Post>('posts');
  
  // Sort by date descending
  posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const featuredPosts = posts.filter((p) => p.data.featured);
  const regularPosts = posts.filter((p) => !p.data.featured);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl text-foreground">Blog</h1>
        <p className="text-card-foreground">
          Thoughts on formal verification, security, programming languages, and deep tech.
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-2xl text-foreground">Featured Posts</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {featuredPosts.map(({ data: post }) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group cursor-pointer rounded-xl border border-primary bg-card p-8 transition-colors hover:border-secondary"
              >
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-full bg-primary/20 px-3 py-1 text-sm text-primary">
                    Featured
                  </div>
                  <div className="rounded-full bg-accent/20 px-3 py-1 text-sm text-accent">
                    {post.category}
                  </div>
                </div>

                <h3 className="mb-3 text-xl text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h3>

                <p className="mb-6 leading-relaxed text-card-foreground">{post.excerpt}</p>

                {post.tags && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Tag size={14} />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-border pt-6">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <span className="text-primary">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section>
        <h2 className="mb-6 text-2xl text-foreground">All Posts</h2>
        <div className="space-y-6">
          {regularPosts.map(({ data: post }) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block cursor-pointer rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="rounded-full bg-accent/20 px-3 py-1 text-sm text-accent">
                      {post.category}
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>

                  <p className="mb-4 text-card-foreground">{post.excerpt}</p>

                  {post.tags && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <div key={tag} className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Tag size={12} />
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground md:flex-col md:items-end md:justify-center">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {posts.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          No blog posts yet. Check back soon!
        </div>
      )}
    </div>
  );
}

