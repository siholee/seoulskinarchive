import Link from 'next/link';
import { fetchBlogPosts } from '@/lib/yurasis-api';
import { Locale } from '@/lib/i18n';
import styles from './BlogSection.module.css';

type Props = {
  lang?: Locale;
};

export default async function BlogSection({ lang = 'ko' }: Props) {
  const postsData = await fetchBlogPosts(1, 3);
  const posts = postsData?.posts || [];

  return (
    <section className={styles.section} id="blog">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionEyebrow}>K-뷰티 인사이트</div>
        <h2 className={styles.sectionTitle}>
          제품 리뷰와<br />
          <em>스킨케어 가이드</em>
        </h2>
      </div>

      {posts.length > 0 ? (
        <>
          <div className={styles.blogGrid}>
            {posts.map((post) => (
              <Link href={`/${lang}/blog/${post.slug}`} key={post.id} className={styles.blogCard}>
                {post.coverImageUrl && (
                  <div className={styles.blogImage}>
                    <img src={post.coverImageUrl} alt={post.title} />
                  </div>
                )}
                <div className={styles.blogContent}>
                  <div className={styles.blogMeta}>
                    {post.author && (
                      <span className={styles.blogAuthor}>{post.author.name}</span>
                    )}
                    {post.publishedAt && (
                      <span className={styles.blogDate}>
                        {new Date(post.publishedAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                  <h3 className={styles.blogTitle}>{post.title}</h3>
                  {post.excerpt && (
                    <p className={styles.blogExcerpt}>{post.excerpt}</p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className={styles.blogTags}>
                      {post.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className={styles.blogTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.blogFooter}>
            <Link href={`/${lang}/blog`} className={styles.blogViewAll}>
              {lang === 'ko' ? '모든 포스트 보기 →' : lang === 'en' ? 'View All Posts →' : 'すべての投稿を見る →'}
            </Link>
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <p>곧 흥미로운 K-뷰티 인사이트를 공유하겠습니다</p>
        </div>
      )}
    </section>
  );
}
