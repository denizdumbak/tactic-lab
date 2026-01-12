import { Link } from "wouter";
import { format } from "date-fns";
import { type Post } from "@shared/schema";
import { cn } from "@/lib/utils";

interface PostPreviewProps {
  post: Post;
}

export function PostPreview({ post }: PostPreviewProps) {
  return (
    <article className="group mb-12 last:mb-0">
      <div className="flex items-baseline space-x-3 text-xs md:text-sm font-medium tracking-wider mb-2">
        <span className="text-primary uppercase">{post.category.replace('-', ' ')}</span>
        <span className="text-muted-foreground/60">•</span>
        <span className="text-muted-foreground">
          {post.createdAt && format(new Date(post.createdAt), 'MMMM d, yyyy')}
        </span>
      </div>

      <Link href={`/post/${post.slug}`}>
        <h2 className={cn(
          "text-2xl md:text-3xl font-serif font-bold mb-3 leading-tight",
          "group-hover:text-primary/80 transition-colors duration-200 cursor-pointer"
        )}>
          {post.title}
        </h2>
      </Link>

      <p className="text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none">
        {post.summary}
      </p>

      <Link 
        href={`/post/${post.slug}`}
        className="inline-block mt-3 text-sm font-bold border-b-2 border-primary/10 hover:border-primary transition-colors pb-0.5"
      >
        Analizi Oku
      </Link>
    </article>
  );
}
