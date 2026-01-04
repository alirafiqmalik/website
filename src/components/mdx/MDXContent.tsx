'use client';

import { useMemo } from 'react';

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  const htmlContent = useMemo(() => {
    // Simple markdown to HTML conversion for common elements
    let html = content;
    
    // Convert headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="mb-2 mt-4 text-xl font-medium text-foreground">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="mb-3 mt-6 text-2xl font-semibold text-foreground">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="mb-4 mt-8 text-3xl font-bold text-foreground">$1</h1>');
    
    // Convert bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-semibold text-foreground"><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Convert inline code
    html = html.replace(/`([^`]+)`/g, '<code class="rounded bg-popover px-1.5 py-0.5 text-sm">$1</code>');
    
    // Convert unordered lists
    html = html.replace(/^\- (.*$)/gim, '<li class="text-card-foreground">$1</li>');
    html = html.replace(/(<li.*<\/li>)\n(<li)/g, '$1$2');
    // Wrap consecutive list items in ul (simplified approach without /s flag)
    const listPattern = /(<li class="text-card-foreground">[\s\S]*?<\/li>)/g;
    html = html.replace(listPattern, '<ul class="mb-4 list-disc space-y-1 pl-6 text-card-foreground">$1</ul>');
    
    // Convert paragraphs (lines that aren't already wrapped)
    html = html.split('\n\n').map(para => {
      if (para.trim().startsWith('<')) return para;
      if (para.trim() === '') return '';
      return `<p class="mb-4 leading-relaxed text-card-foreground">${para.trim()}</p>`;
    }).join('\n');
    
    return html;
  }, [content]);

  return (
    <div 
      className="prose prose-neutral max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

