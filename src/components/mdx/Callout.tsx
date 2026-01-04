'use client';

import { ReactNode } from 'react';
import { Info, AlertTriangle, Lightbulb, AlertCircle } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'tip' | 'error';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
  error: AlertCircle,
};

const styles = {
  info: 'border-primary bg-primary/10 text-primary',
  warning: 'border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  tip: 'border-secondary bg-secondary/10 text-secondary',
  error: 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400',
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const Icon = icons[type];
  
  return (
    <div className={`my-6 flex gap-3 rounded-lg border-l-4 p-4 ${styles[type]}`}>
      <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" />
      <div>
        {title && <div className="mb-1 font-medium">{title}</div>}
        <div className="text-card-foreground">{children}</div>
      </div>
    </div>
  );
}

