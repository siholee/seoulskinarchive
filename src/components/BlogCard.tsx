'use client';

import { BlogPost } from '@/lib/yurasis-api';
import { Calendar, User } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block bg-sand rounded-2xl overflow-hidden border-2 border-camel/20 hover:border-sage hover:shadow-xl transition-all duration-300"
    >
      {/* Cover Image */}
      {post.coverImageUrl ? (
        <div className="aspect-video bg-cream overflow-hidden">
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-sage/20 to-camel/20 flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-sage/10 text-sage text-xs font-medium rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-sage transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-charcoal-light text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-charcoal-light">
          {post.author && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{post.author.name}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </div>
    </a>
  );
}
