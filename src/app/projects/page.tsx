import Link from 'next/link';
import { getAllContent } from '@/lib/content';
import type { Project } from '@/types';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function ProjectsPage() {
  const projects = getAllContent<Project>('projects');
  
  // Sort by importance
  projects.sort((a, b) => (a.data.importance || 99) - (b.data.importance || 99));

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl text-foreground">Projects</h1>
        <p className="text-card-foreground">
          Open-source tools and research prototypes in formal verification, security analysis, and automated reasoning.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map(({ data: project }) => (
          <div
            key={project.slug}
            className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary"
          >
            {/* Project Image */}
            <Link href={`/projects/${project.slug}`} className="block">
              <div 
                className="relative overflow-hidden bg-popover"
                style={{
                  height: project.thumbnailImage?.height ? `${project.thumbnailImage.height}px` : '192px'
                }}
              >
                {/* Use thumbnailImage or fall back to legacy img */}
                {(project.thumbnailImage?.src || project.img) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.thumbnailImage?.src || project.img}
                    alt={project.thumbnailImage?.alt || project.title}
                    className="h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-80"
                    style={{
                      width: project.thumbnailImage?.width ? `${project.thumbnailImage.width}px` : '100%',
                      maxWidth: '100%'
                    }}
                  />
                )}
                {project.status && (
                  <div className="absolute right-4 top-4">
                    <div className="rounded-full bg-background/80 px-3 py-1 text-sm text-primary backdrop-blur-sm">
                      {project.status}
                    </div>
                  </div>
                )}
              </div>
            </Link>

            {/* Project Content */}
            <div className="p-6">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="mb-1 text-xl text-foreground transition-colors hover:text-primary">
                      {project.title}
                    </h3>
                  </Link>
                  <div className="text-sm text-primary">{project.category}</div>
                </div>
              </div>

              <p className="mb-4 leading-relaxed text-card-foreground">{project.description}</p>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-xs text-card-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              <div className="flex gap-4 border-t border-border pt-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center gap-2 text-primary transition-opacity hover:opacity-80"
                >
                  View Details
                </Link>
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-card-foreground transition-colors hover:text-primary"
                  >
                    <FaGithub size={16} />
                  </a>
                )}
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-card-foreground transition-colors hover:text-primary"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

