const YURASIS_API_URL = process.env.NEXT_PUBLIC_YURASIS_API_URL || 'https://yurasis.com/api/public';
const BLOG_SLUG = process.env.YURASIS_BLOG_SLUG || 'ssa';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  publishedAt: string;
  author?: {
    name: string;
    profileImageUrl?: string;
  };
  tags?: string[];
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
}

export async function fetchBlogPosts(page = 1, pageSize = 10): Promise<BlogListResponse> {
  const url = `${YURASIS_API_URL}/blogs/${BLOG_SLUG}/posts?page=${page}&pageSize=${pageSize}`;
  
  const response = await fetch(url, {
    next: { revalidate: 300 }, // 5분 캐싱
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
  const url = `${YURASIS_API_URL}/blogs/${BLOG_SLUG}/posts/${slug}`;
  
  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog post: ${response.statusText}`);
  }

  return response.json();
}
