import { Github, Linkedin, GraduationCap } from 'lucide-react';
import { getPageContent } from '@/lib/content';
import type { PersonalInfo } from '@/types';

export function Footer() {
  let personal: PersonalInfo | null = null;
  
  try {
    const content = getPageContent<PersonalInfo>('personal.md');
    personal = content.data;
  } catch {
    // Content not found, will show fallback
  }

  return (
    <footer className="mt-32 border-t border-border bg-footer-bg">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-3 text-foreground">{personal?.name || 'Ali Hamza Malik'}</div>
            <p className="text-muted-foreground">{personal?.tagline || ''}</p>
          </div>
          <div>
            <div className="mb-3 text-foreground">Contact</div>
            <div className="space-y-2 text-muted-foreground">
              <p>{personal?.email || ''}</p>
              <p>Location: {personal?.location || ''}</p>
            </div>
          </div>
          <div>
            <div className="mb-3 text-foreground">Links</div>
            <div className="flex gap-4">
              {personal?.socials?.github && (
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
              {personal?.socials?.linkedin && (
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
              {personal?.socials?.scholar && (
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
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {personal?.name || 'Ali Hamza Malik'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

