'use client';

import { ReactNode } from 'react';

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function CodeBlock({ children, className, title }: CodeBlockProps) {
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-border">
      {title && (
        <div className="border-b border-border bg-popover px-4 py-2 text-sm text-muted-foreground">
          {title}
        </div>
      )}
      <pre className={`overflow-x-auto bg-popover p-4 ${className || ''}`}>
        {children}
      </pre>
    </div>
  );
}

