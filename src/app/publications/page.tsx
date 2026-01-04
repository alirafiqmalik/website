import { getAllContent } from '@/lib/content';
import type { Publication } from '@/types';
import { FileText, ExternalLink, Code } from 'lucide-react';

export default function PublicationsPage() {
  const publications = getAllContent<Publication>('publications');
  
  // Sort by year descending
  publications.sort((a, b) => b.data.year - a.data.year);

  // Group by year
  const publicationsByYear = publications.reduce((acc, pub) => {
    const year = pub.data.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(pub);
    return acc;
  }, {} as Record<number, typeof publications>);

  const years = Object.keys(publicationsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl text-foreground">Publications</h1>
        <p className="text-card-foreground">
          Research papers in formal verification, security, and programming languages.
        </p>
      </div>

      {years.map((year) => (
        <section key={year} className="mb-12">
          <h2 className="mb-6 border-b border-border pb-2 text-2xl text-foreground">{year}</h2>
          <div className="space-y-6">
            {publicationsByYear[Number(year)].map(({ data: pub }) => (
              <div key={pub.slug} className="group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground group-hover:text-primary">
                      {pub.title}
                    </h3>
                    <div className="mt-1 text-sm text-muted-foreground">{pub.authors}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-primary">{pub.venue}</span>
                      {pub.award && (
                        <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-xs text-secondary">
                          🏆 {pub.award}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {pub.links?.pdf && (
                      <a
                        href={pub.links.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-popover hover:text-primary"
                        title="PDF"
                      >
                        <FileText size={18} />
                      </a>
                    )}
                    {pub.links?.doi && (
                      <a
                        href={pub.links.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-popover hover:text-primary"
                        title="DOI"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {pub.links?.code && (
                      <a
                        href={pub.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-popover hover:text-primary"
                        title="Code"
                      >
                        <Code size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

