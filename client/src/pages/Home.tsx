import { Layout } from "@/components/Layout";
import { PostPreview } from "@/components/PostPreview";
import { usePosts } from "@/hooks/use-posts";
import { useLanguage } from "@/lib/language-context";

export default function Home() {
  const { data: posts, isLoading } = usePosts();
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="mb-12 pt-8 pb-10 border-b border-border/40">
        <p className="text-lg md:text-xl font-serif leading-relaxed text-foreground/90 max-w-2xl mx-auto text-center italic">
          {t('home.manifesto')}
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-video bg-gray-200 rounded-lg" />
                <div className="h-4 w-1/4 bg-gray-200" />
                <div className="h-6 w-3/4 bg-gray-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {posts?.map((post) => (
              <PostPreview key={post.id} post={post} />
            ))}
          </div>
        )}

        {posts?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            {t('home.emptyState')}
          </div>
        )}
      </section>
    </Layout>
  );
}