import { useRoute } from "wouter";
import { Layout } from "@/components/Layout";
import { PostPreview } from "@/components/PostPreview";
import { usePosts } from "@/hooks/use-posts";
import { useLanguage } from "@/lib/language-context";
import { getCategoryTitle, getCategoryDescription } from "@/lib/i18n";

export default function Category() {
  const [match, params] = useRoute("/:category");
  const category = params?.category || "scout";
  const { data: posts, isLoading } = usePosts(category);
  const { language, t } = useLanguage();

  const validCategories = ['scout', 'taktik', 'mac-analizi'];
  if (!validCategories.includes(category)) return null;

  return (
    <Layout>
      <header className="mb-12 pt-4 border-b border-border/40 pb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4" data-testid="text-category-title">
          {getCategoryTitle(language, category)}
        </h1>
        <p className="text-lg text-muted-foreground font-serif italic max-w-3xl" data-testid="text-category-description">
          {getCategoryDescription(language, category)}
        </p>
      </header>

      {/* Grid Yapısı Eklendi */}
      <div className="w-full">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg" />
                <div className="h-6 bg-gray-100 w-3/4" />
                <div className="h-4 bg-gray-100 w-full" />
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
          <div className="text-center py-20 text-muted-foreground" data-testid="text-empty-state">
            {t('category.emptyState')}
          </div>
        )}
      </div>
    </Layout>
  );
}