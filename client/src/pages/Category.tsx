import { useRoute } from "wouter";
import { Layout } from "@/components/Layout";
import { PostPreview } from "@/components/PostPreview";
import { usePosts } from "@/hooks/use-posts";
import { CATEGORY_TITLES, CATEGORY_DESCRIPTIONS } from "@/lib/constants";

export default function Category() {
  const [match, params] = useRoute("/:category");
  const category = params?.category || "scout";
  const { data: posts, isLoading } = usePosts(category);

  if (!CATEGORY_TITLES[category]) return null; // Or 404

  return (
    <Layout>
      <header className="mb-16 pt-8 border-b border-border/40 pb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
          {CATEGORY_TITLES[category]}
        </h1>
        <p className="text-lg text-muted-foreground font-serif italic">
          {CATEGORY_DESCRIPTIONS[category]}
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
          <div className="text-center py-20 text-muted-foreground">
            Bu kategoride henüz yazı bulunmamaktadır.
          </div>
        )}
      </div>
    </Layout>
  );
}
