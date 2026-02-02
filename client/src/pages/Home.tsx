import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { PostPreview } from "@/components/PostPreview";
import { usePosts } from "@/hooks/use-posts";
import { useLanguage } from "@/lib/language-context";

export default function Home() {
  const { data: posts, isLoading } = usePosts();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  // Navigasyondaki arama çubuğundan gelen sinyalleri yakalıyoruz
  useEffect(() => {
    const handleSearch = (e: CustomEvent<string>) => {
      setSearchQuery(e.detail);
    };

    // "site-search" isimli özel event'i dinle
    window.addEventListener("site-search", handleSearch as EventListener);
    
    return () => {
      window.removeEventListener("site-search", handleSearch as EventListener);
    };
  }, []);

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Manifesto Bölümü - Arama kutusu buradan kaldırıldı */}
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
                <div className="aspect-video bg-muted rounded-lg" />
                <div className="h-4 w-1/4 bg-muted" />
                <div className="h-6 w-3/4 bg-muted" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredPosts?.map((post) => (
              <PostPreview key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Arama Sonucu Bulunamadı Durumu */}
        {!isLoading && filteredPosts?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-xl italic">
            {searchQuery 
              ? `"${searchQuery}" için sonuç bulunamadı.` 
              : t('home.emptyState')}
          </div>
        )}
      </section>
    </Layout>
  );
}