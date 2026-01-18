import { Layout } from "@/components/Layout";
import { PostPreview } from "@/components/PostPreview";
import { usePosts } from "@/hooks/use-posts";

export default function Home() {
  const { data: posts, isLoading } = usePosts();

  return (
    <Layout>
      {/* Manifesto */}
      <section className="mb-20 pt-8 pb-12 border-b border-border/40">
        <p className="text-lg md:text-xl font-serif leading-relaxed text-foreground/90 max-w-2xl mx-auto text-center italic">
          Skorun ötesinde, oyunun kalbinde. <br />
          Her maçın hikayesini, her oyuncunun potansiyelini keşfedin.
        </p>
      </section>

      {/* Latest Articles */}
      <section className="max-w-2xl mx-auto">
        {isLoading ? (
          <div className="space-y-12 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-gray-200 mb-4 rounded-none" />
                <div className="h-8 w-3/4 bg-gray-200 mb-4 rounded-none" />
                <div className="h-4 w-full bg-gray-200 mb-2 rounded-none" />
                <div className="h-4 w-2/3 bg-gray-200 rounded-none" />
              </div>
            ))}
          </div>
        ) : (
          posts?.map((post) => <PostPreview key={post.id} post={post} />)
        )}

        {posts?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Henüz yayımlanmış bir yazı bulunmamaktadır.
          </div>
        )}
      </section>
    </Layout>
  );
}
