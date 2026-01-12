import { useRoute, Link } from "wouter";
import { usePost } from "@/hooks/use-posts";
import { Layout } from "@/components/Layout";
import { ScoutProfile } from "@/components/ScoutProfile";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

export default function PostDetail() {
  const [, params] = useRoute("/post/:slug");
  const slug = params?.slug || "";
  const { data: post, isLoading, error } = usePost(slug);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto pt-10 animate-pulse">
          <div className="h-4 w-24 bg-gray-200 mb-6" />
          <div className="h-12 w-full bg-gray-200 mb-8" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-5/6 bg-gray-200" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Article not found</h2>
          <Link href="/" className="text-primary underline">Return Home</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="max-w-2xl mx-auto pt-8 md:pt-12">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to list
        </Link>

        <header className="mb-10 md:mb-14">
          <div className="flex items-center space-x-3 text-sm font-medium tracking-wider mb-4">
            <span className="text-primary uppercase">{post.category.replace('-', ' ')}</span>
            <span className="text-muted-foreground/60">•</span>
            <span className="text-muted-foreground">
              {post.createdAt && format(new Date(post.createdAt), 'MMMM d, yyyy')}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight text-primary mb-6">
            {post.title}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-serif italic leading-relaxed">
            {post.summary}
          </p>
        </header>

        {post.imageUrl && (
          <div className="mb-12">
            {/* Unsplash descriptive comment */}
            {/* football match tactics analysis stadium view */}
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-auto bg-gray-100" 
            />
            <p className="mt-2 text-xs text-center text-muted-foreground/60 italic">
              Image source: Unsplash
            </p>
          </div>
        )}

        {post.scoutProfile && <ScoutProfile profile={post.scoutProfile} />}

        <div className="prose prose-lg prose-gray font-serif prose-headings:font-serif prose-headings:font-bold prose-headings:text-primary prose-p:font-sans prose-p:text-foreground/90 max-w-none mb-20">
          {post.content.split('\n').map((paragraph, idx) => (
            paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />
          ))}
        </div>
      </article>
    </Layout>
  );
}
