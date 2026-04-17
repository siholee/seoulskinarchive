import { fetchBlogPost, fetchBlogPosts } from '@/lib/yurasis-api';
import { notFound } from 'next/navigation';
import { Calendar, User } from 'lucide-react';

export async function generateStaticParams() {
  const { posts } = await fetchBlogPosts(1, 50);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  
  try {
    post = await fetchBlogPost(params.slug);
  } catch (error) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-charcoal text-cream py-6 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold hover:text-sage-light transition-colors">
            Seoul Skin Archive
          </a>
          <nav className="flex gap-6">
            <a href="/" className="hover:text-sage-light transition-colors">
              Home
            </a>
            <a href="/blog" className="hover:text-sage-light transition-colors">
              Blog
            </a>
          </nav>
        </div>
      </header>

      {/* Article Header */}
      <article className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Cover Image */}
          {post.coverImageUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden aspect-video bg-sand">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-charcoal-light mb-8 pb-8 border-b border-camel/30">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.profileImageUrl && (
                  <img
                    src={post.author.profileImageUrl}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    <span className="font-medium text-charcoal">{post.author.name}</span>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1 bg-sage/10 text-sage border border-sage/30 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-charcoal prose-p:text-charcoal-light prose-a:text-sage prose-a:no-underline hover:prose-a:underline prose-strong:text-charcoal prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-camel/30">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sage text-cream font-semibold rounded-full hover:bg-sage-dark transition-all"
            >
              ← 블로그 목록으로
            </a>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-charcoal text-cream py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-4">Seoul Skin Archive</h3>
          <p className="text-sm text-cream/70 mb-6">
            Seoul&apos;s best-kept skincare secrets, curated for your skin.
          </p>
          <p className="text-xs text-cream/50">
            © 2026 Seoul Skin Archive. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
