import { getAllContent } from '@/lib/content';
import type { HistoryItem } from '@/types';

const monthOrder: Record<string, number> = {
  'January': 1, 'February': 2, 'March': 3, 'April': 4,
  'May': 5, 'June': 6, 'July': 7, 'August': 8,
  'September': 9, 'October': 10, 'November': 11, 'December': 12
};

export default function HistoryPage() {
  const historyItems = getAllContent<HistoryItem>('history');
  
  // Sort by year and month descending (latest to oldest)
  historyItems.sort((a, b) => {
    const yearA = parseInt(a.data.year);
    const yearB = parseInt(b.data.year);
    if (yearA !== yearB) return yearB - yearA;
    
    const monthA = monthOrder[a.data.month] || 0;
    const monthB = monthOrder[b.data.month] || 0;
    return monthB - monthA;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Professional':
        return 'border-primary';
      case 'Education':
        return 'border-secondary';
      case 'Award':
        return 'border-accent';
      default:
        return 'border-border';
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl text-foreground">History</h1>
        <p className="text-card-foreground">
          A timeline of my professional journey, education, and achievements.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-border md:block" />

        <div className="space-y-8">
          {historyItems.map(({ data: item }) => (
            <div key={item.slug} className="relative grid grid-cols-1 gap-4 md:grid-cols-[80px_1fr] md:gap-8">
              {/* Date marker */}
              <div className="flex items-start justify-center">
                <div className="relative z-10 rounded-full bg-background px-3 py-1 text-center text-sm font-medium text-primary">
                  <div>{item.month.slice(0, 3)}</div>
                  <div className="text-lg">{item.year}</div>
                </div>
              </div>

              {/* Content card */}
              <div className={`rounded-lg border-l-4 bg-card p-6 ${getTypeColor(item.type)}`}>
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                    <div className="text-primary">{item.organization}</div>
                  </div>
                  <span className="rounded-full bg-popover px-3 py-1 text-xs text-muted-foreground">
                    {item.type}
                  </span>
                </div>
                <p className="mb-4 text-card-foreground">{item.description}</p>
                {item.details && item.details.length > 0 && (
                  <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {item.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
