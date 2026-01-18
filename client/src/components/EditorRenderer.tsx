import parse, { domToReact, type HTMLReactParserOptions, type DOMNode, Element } from "html-react-parser";
import DOMPurify from "dompurify";
import type { EditorJSContent, EditorJSBlock } from "@shared/schema";

interface EditorRendererProps {
  content: EditorJSContent | string | null;
}

function isEditorJSContent(content: any): content is EditorJSContent {
  return content && typeof content === 'object' && Array.isArray(content.blocks);
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, '');
}

const parserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element) {
      const { name, attribs, children } = domNode;
      
      if (name === 'a') {
        const href = attribs.href || '#';
        const safeHref = /^(https?:|mailto:)/.test(href) ? href : '#';
        return (
          <a href={safeHref} rel="noopener noreferrer" className="text-primary underline">
            {domToReact(children as DOMNode[], parserOptions)}
          </a>
        );
      }
      
      if (name === 'code') {
        return (
          <code className="bg-muted px-1 rounded">
            {domToReact(children as DOMNode[], parserOptions)}
          </code>
        );
      }
    }
    return undefined;
  },
};

function parseInlineFormatting(text: string): React.ReactNode {
  const sanitized = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ['b', 'i', 'u', 'strong', 'em', 'a', 'br', 'mark', 'code'],
    ALLOWED_ATTR: ['href'],
  });
  
  return parse(sanitized, parserOptions);
}

function renderBlock(block: EditorJSBlock, index: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index}>
          {parseInlineFormatting(block.data.text || '')}
        </p>
      );
    
    case 'header':
      const level = block.data.level || 2;
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag key={index}>
          {parseInlineFormatting(block.data.text || '')}
        </HeadingTag>
      );
    
    case 'quote':
      return (
        <blockquote key={index}>
          <p>{parseInlineFormatting(block.data.text || '')}</p>
          {block.data.caption && (
            <cite>{stripHtml(block.data.caption)}</cite>
          )}
        </blockquote>
      );
    
    case 'list':
      const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
      const items = block.data.items || [];
      return (
        <ListTag key={index}>
          {items.map((item: string, i: number) => (
            <li key={i}>{parseInlineFormatting(item)}</li>
          ))}
        </ListTag>
      );
    
    case 'image':
      const imageUrl = block.data.file?.url || block.data.url;
      if (!imageUrl) return null;
      const caption = block.data.caption ? stripHtml(block.data.caption) : '';
      return (
        <figure key={index} className="my-8">
          <img 
            src={imageUrl} 
            alt={caption}
            className="w-full h-auto rounded-sm"
            loading="lazy"
          />
          {caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2 italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    
    default:
      return null;
  }
}

function renderLegacyContent(content: string) {
  const paragraphs = content.split('\n').filter(p => p.trim());
  return paragraphs.map((paragraph, idx) => {
    const text = stripHtml(paragraph);
    return <p key={idx}>{text}</p>;
  });
}

export function EditorRenderer({ content }: EditorRendererProps) {
  if (!content) {
    return null;
  }

  if (isEditorJSContent(content)) {
    return (
      <>
        {content.blocks.map((block, index) => renderBlock(block, index))}
      </>
    );
  }

  if (typeof content === 'string') {
    return <>{renderLegacyContent(content)}</>;
  }

  return null;
}
