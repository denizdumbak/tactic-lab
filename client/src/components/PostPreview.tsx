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
    <article className="group mb-8 pb-8 border-b border-border/40 last:border-0 last:mb-0 last:pb-0 flex flex-col md:flex-row gap-6 items-start">
      
      {/* --- SOL TARAF: METİN İÇERİĞİ --- */}
      <div className="flex-1 order-2 md:order-1">
        
        {/* Kategori ve Tarih */}
        <div className="flex items-center space-x-3 text-xs md:text-sm font-medium tracking-wider mb-2">
          <span className="text-primary tracking-wider uppercase" data-testid={`text-category-${post.id}`}>
            {getCategoryLabel(language, post.category)}
          </span>
          <span className="text-muted-foreground/60">•</span>
          <span className="text-muted-foreground">
            {post.createdAt && format(new Date(post.createdAt), 'MMM d, yyyy')}
          </span>
        </div>

        {/* Başlık */}
        <Link href={`/post/${post.slug}`}>
          <h2 className={cn(
            "text-xl md:text-2xl font-serif font-bold mb-3 leading-tight",
            "group-hover:text-primary transition-colors duration-200 cursor-pointer"
          )} data-testid={`text-title-${post.id}`}>
            {post.title}
          </h2>
        </Link>

        {/* Özet Metni */}
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3 mb-3">
          {post.summary}
        </p>

        {/* Devamını Oku Linki */}
        <Link 
          href={`/post/${post.slug}`}
          className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors"
          data-testid={`link-read-${post.id}`}
        >
          {t('post.readAnalysis')} 
          <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* --- SAĞ TARAF: GÖRSEL --- */}
      <Link href={`/post/${post.slug}`} className="order-1 md:order-2 w-full md:w-60 shrink-0">
        <div className="aspect-video md:aspect-[4/3] overflow-hidden rounded-md bg-gray-100 border border-border/50">
          <img 
            src={imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            data-testid={`img-post-${post.id}`}
          />
        </div>
      </Link>

    </article>
  );
}