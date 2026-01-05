import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContentBySlug, getAllSlugs } from '@/lib/content';
import type { Project } from '@/types';
import { ArrowLeft, ExternalLink, FileText, BookOpen } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { MDXContent } from '@/components/mdx';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('projects');
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectContent = getContentBySlug<Project>('projects', slug);

  if (!projectContent) {
    notFound();
  }

  const { data: project, content } = projectContent;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Back Link */}
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      {/* Header */}
      <div className="mb-8">
        {/* Detail Images - Multiple images for detail page header */}
        {project.detailImages && project.detailImages.length > 0 && (
          <div className="mb-6 grid gap-4" style={{ 
            // Use single column for one image, otherwise auto-fit grid with min 300px columns
            gridTemplateColumns: project.detailImages.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))' 
          }}>
            {/* image: ProjectImage - individual image object with src, width, height, alt */}
            {/* idx: number - index of current image in the array */}
            {project.detailImages.map((image, idx) => {
              // Parse dimensions from image object, use defaults if not provided
              const originalWidth = image.width || 1200;
              const originalHeight = image.height || 400;
              
              // Calculate aspect ratio from parsed dimensions
              const aspectRatio = originalWidth / originalHeight;
              
              // Maximum container dimensions
              const maxWidth = 1200;
              const maxHeight = 400;
              
              // Scale dimensions to fit within max bounds while preserving aspect ratio
              let displayWidth = originalWidth;
              let displayHeight = originalHeight;
              
              // Scale down if width exceeds maximum
              if (displayWidth > maxWidth) {
                displayWidth = maxWidth;
                displayHeight = displayWidth / aspectRatio;
              }
              
              // Scale down if height exceeds maximum
              if (displayHeight > maxHeight) {
                displayHeight = maxHeight;
                displayWidth = displayHeight * aspectRatio;
              }
              
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center overflow-hidden rounded-xl"
                  style={{
                    height: `${displayHeight}px`,
                    maxHeight: `${maxHeight}px`
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.alt || `${project.title} - Image ${idx + 1}`}
                    className="h-full w-full object-contain"
                    style={{
                      width: `${displayWidth}px`,
                      height: `${displayHeight}px`,
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="mb-2 text-4xl text-foreground">{project.title}</h1>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-primary">{project.category}</span>
              {project.status && (
                <span className="rounded-full bg-primary/20 px-3 py-1 text-sm text-primary">
                  {project.status}
                </span>
              )}
            </div>
            <p className="text-lg text-card-foreground">{project.description}</p>
          </div>
        </div>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 text-sm text-card-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        {project.links && (
          <div className="mt-6 flex flex-wrap gap-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-card-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FaGithub size={18} />
                GitHub
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-card-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <ExternalLink size={18} />
                Demo
              </a>
            )}
            {project.links.paper && (
              <a
                href={project.links.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-card-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FileText size={18} />
                Paper
              </a>
            )}
            {project.links.docs && (
              <a
                href={project.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-card-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <BookOpen size={18} />
                Documentation
              </a>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <MDXContent content={content} />
    </div>
  );
}
