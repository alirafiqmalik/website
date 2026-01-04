import type { MDXComponents } from 'mdx/types';
import { Callout, CodeBlock, YouTube } from '@/components/mdx';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components
    Callout,
    CodeBlock,
    YouTube,
    
    // Styled HTML elements
    h1: ({ children }) => (
      <h1 className="mb-4 mt-8 text-3xl font-bold text-foreground">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-6 text-2xl font-semibold text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-4 text-xl font-medium text-foreground">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-card-foreground">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-6 text-card-foreground">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-6 text-card-foreground">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-card-foreground">{children}</li>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary hover:underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    code: ({ children, className }) => {
      const isBlock = className?.includes('language-');
      return isBlock ? (
        <code className={`block overflow-x-auto rounded-lg bg-popover p-4 text-sm ${className}`}>
          {children}
        </code>
      ) : (
        <code className="rounded bg-popover px-1.5 py-0.5 text-sm">{children}</code>
      );
    },
    pre: ({ children }) => (
      <pre className="mb-4 overflow-x-auto rounded-lg bg-popover">{children}</pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ''}
        className="h-auto max-w-full rounded-lg shadow-md"
        loading="lazy"
      />
    ),
    table: ({ children }) => (
      <div className="mb-4 overflow-x-auto">
        <table className="min-w-full rounded-lg border border-border">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-border bg-popover px-4 py-2 text-left font-medium text-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-border px-4 py-2 text-card-foreground">{children}</td>
    ),
    hr: () => <hr className="my-8 border-border" />,
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    
    ...components,
  };
}

