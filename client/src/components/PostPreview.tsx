import { Link } from "wouter";
import { format } from "date-fns";
import { type Post } from "@shared/schema";
import { cn } from "@/lib/utils";
import { getPlaceholderImage } from "@/lib/constants";
import { useLanguage } from "@/lib/language-context";
import { getCategoryLabel } from "@/lib/i18n";

interface PostPreviewProps {
  post: Post;
}

export function PostPreview({ post }: PostPreviewProps) {
  const imageUrl = post.imageUrl || getPlaceholderImage(post.category);
  const { t, language } = useLanguage();

  return (
    <article className="group flex flex-col h-full">
      <Link href={`/post/${post.slug}`} className="block mb-4">
        <div className="aspect-video overflow-hidden rounded-lg bg-muted border border-border/50">
          <img 
            src={imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-grow space-y-2">
        <div className="flex items-center text-[10px] md:text-xs font-bold tracking-widest uppercase text-primary/80">
          {getCategoryLabel(language, post.category)}
          <span className="mx-2 text-muted-foreground/30">•</span>
          <span className="font-normal text-muted-foreground italic">
            {post.createdAt && format(new Date(post.createdAt), 'dd.MM.yyyy')}
          </span>
        </div>

        <Link href={`/post/${post.slug}`}>
          <h2 className="text-lg md:text-xl font-serif font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-muted-foreground text-xs md:text-sm line-clamp-3 leading-relaxed">
          {post.summary}
        </p>

        <div className="pt-3 mt-auto">
          <Link 
            href={`/post/${post.slug}`}
            className="text-xs font-bold uppercase tracking-tighter border-b-2 border-primary/20 hover:border-primary transition-all pb-1"
          >
            {t('post.readAnalysis')} →
          </Link>
        </div>
      </div>
    </article>
  );
}