import Link from 'next/link';
import { Github, Linkedin, GraduationCap, Mail, MapPin } from 'lucide-react';
import { getPageContent } from '@/lib/content';
import type { PersonalInfo, NewsItem, HomeData } from '@/types';

export default function HomePage() {
  const personalContent = getPageContent<PersonalInfo>('personal.md');
  const newsContent = getPageContent<{ news: NewsItem[] }>('news.md');
  const homeContent = getPageContent<HomeData>('home.md');

  const personal = personalContent.data;
  const bio = personalContent.content;
  const news = newsContent.data.news || [];
  const { researchInterests, selectedPublications } = homeContent.data;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Hero Section - Al-folio Style */}
      <section className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-[200px_1fr]">
        {/* Left Column - Profile */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-4 h-48 w-48 overflow-hidden rounded-full border-4 border-border bg-gradient-to-br from-primary to-secondary">
            {personal.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={personal.profileImage}
                alt={personal.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl text-white">
                {personal.name?.split(' ').map((n) => n[0]).join('')}
              </div>
            )}
          </div>
          <h1 className="mb-1 text-center text-2xl font-medium text-foreground md:text-left">
            {personal.name}
          </h1>
          <p className="mb-4 text-center text-muted-foreground md:text-left">
            Research Scientist
          </p>
          
          {/* Contact Info */}
          <div className="mb-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <a href={`mailto:${personal.email}`} className="hover:text-primary">
                {personal.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>{personal.location}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {personal.socials?.github && (
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            )}
            {personal.socials?.linkedin && (
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
            {personal.socials?.scholar && (
              <a
                href={personal.socials.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Google Scholar"
              >
                <GraduationCap size={20} />
              </a>
            )}
            {personal.socials?.website && (
              <a
                href={personal.socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Website"
              >
                <Globe size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Right Column - Bio */}
        <div>
          <p className="mb-6 text-lg leading-relaxed text-card-foreground">
            {personal.bio}
          </p>
          <div className="whitespace-pre-line text-card-foreground">
            {bio}
          </div>
          
          {/* Research Interests as Tags */}
          <div className="mt-6">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Research Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {researchInterests?.map((interest, index) => (
                <span
                  key={index}
                  className="rounded-full border border-border px-3 py-1 text-sm text-card-foreground"
                >
                  {interest.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="mb-16">
        <h2 className="mb-6 border-b border-border pb-2 text-xl font-medium text-foreground">
          News
        </h2>
        <div className="space-y-3">
          {news.map((item, index) => (
            <div key={index} className="flex gap-4">
              <span className="w-24 flex-shrink-0 text-sm text-primary">
                {item.date}
              </span>
              <div>
                <span className="font-medium text-foreground">{item.title}</span>
                <span className="text-muted-foreground"> — {item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Publications */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between border-b border-border pb-2">
          <h2 className="text-xl font-medium text-foreground">Selected Publications</h2>
          <Link href="/publications" className="text-sm text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="space-y-4">
          {selectedPublications?.map((pub, index) => (
            <div key={index} className="group">
              <div className="font-medium text-foreground group-hover:text-primary">
                {pub.title}
              </div>
              <div className="text-sm text-muted-foreground">
                {pub.authors}
              </div>
              <div className="text-sm text-primary">
                {pub.venue}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Link
          href="/cv"
          className="rounded-lg border border-border p-4 text-center transition-colors hover:border-primary hover:text-primary"
        >
          CV
        </Link>
        <Link
          href="/publications"
          className="rounded-lg border border-border p-4 text-center transition-colors hover:border-primary hover:text-primary"
        >
          Publications
        </Link>
        <Link
          href="/projects"
          className="rounded-lg border border-border p-4 text-center transition-colors hover:border-primary hover:text-primary"
        >
          Projects
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-border p-4 text-center transition-colors hover:border-primary hover:text-primary"
        >
          Blog
        </Link>
      </section>
    </div>
  );
}

