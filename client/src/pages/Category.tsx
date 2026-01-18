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
      <header className="mb-16 pt-8 border-b border-border/40 pb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4" data-testid="text-category-title">
          {getCategoryTitle(language, category)}
        </h1>
        <p className="text-lg text-muted-foreground font-serif italic" data-testid="text-category-description">
          {getCategoryDescription(language, category)}
        </p>
      </header>

      <div className="max-w-2xl mx-auto">
        {isLoading ? (
          <div className="space-y-12 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-gray-100 w-full" />
            ))}
          </div>
        ) : (
          posts?.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))
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
