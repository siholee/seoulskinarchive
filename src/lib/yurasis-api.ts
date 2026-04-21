const YURASIS_API_URL = process.env.NEXT_PUBLIC_YURASIS_API_URL || 'https://yurasis.com/api/public';
const BLOG_SLUG = process.env.YURASIS_BLOG_SLUG || 'ssa';

type YurasisAuthor = {
  name: string;
  profileImageUrl?: string;
};

type YurasisPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImageUrl?: string;
  coverImage?: string;
  publishedAt: string;
  author?: YurasisAuthor;
  tags?: string[];
};

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  publishedAt: string;
  author?: YurasisAuthor;
  tags?: string[];
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
}

function normalizePost(post: YurasisPost): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: typeof post.content === 'string' ? post.content : '',
    coverImageUrl: post.coverImageUrl || post.coverImage,
    publishedAt: post.publishedAt,
    author: post.author,
    tags: Array.isArray(post.tags) ? post.tags : [],
  };
}

export async function fetchBlogPosts(page = 1, pageSize = 10): Promise<BlogListResponse> {
  const url = `${YURASIS_API_URL}/blogs/${BLOG_SLUG}/posts?page=${page}&pageSize=${pageSize}`;

  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    posts: Array.isArray(data.posts) ? data.posts.map(normalizePost) : [],
    total: typeof data.total === 'number' ? data.total : 0,
    page: typeof data.page === 'number' ? data.page : page,
    pageSize: typeof data.limit === 'number' ? data.limit : pageSize,
  };
}

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
  const url = `${YURASIS_API_URL}/blogs/${BLOG_SLUG}/posts/${slug}`;

  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog post: ${response.statusText}`);
  }

  const data = await response.json();
  return normalizePost(data.post ?? data);
}
