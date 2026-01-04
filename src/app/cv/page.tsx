import { getPageContent } from '@/lib/content';
import type { CVData } from '@/types';

export default function CVPage() {
  const cvContent = getPageContent<CVData>('cv.md');
  const cv = cvContent.data;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl text-foreground">Curriculum Vitae</h1>
        <div className="flex flex-wrap gap-4 text-muted-foreground">
          <span>{cv.contact.email}</span>
          <span>•</span>
          <span>{cv.contact.location}</span>
          {cv.contact.website && (
            <>
              <span>•</span>
              <a href={`https://${cv.contact.website}`} className="text-primary hover:underline">
                {cv.contact.website}
              </a>
            </>
          )}
        </div>
      </div>

      {/* Education */}
      <section className="mb-12">
        <h2 className="mb-6 border-b border-border pb-2 text-2xl text-foreground">Education</h2>
        <div className="space-y-6">
          {cv.education?.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto]">
              <div>
                <h3 className="font-medium text-foreground">{edu.degree}</h3>
                <div className="text-primary">{edu.institution}</div>
                <div className="text-sm text-muted-foreground">{edu.location}</div>
                {edu.details && (
                  <div className="mt-1 text-sm text-card-foreground">{edu.details}</div>
                )}
                {edu.advisor && (
                  <div className="text-sm text-muted-foreground">{edu.advisor}</div>
                )}
              </div>
              <div className="text-muted-foreground md:text-right">{edu.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="mb-6 border-b border-border pb-2 text-2xl text-foreground">Experience</h2>
        <div className="space-y-8">
          {cv.experience?.map((exp, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto]">
              <div>
                <h3 className="font-medium text-foreground">{exp.title}</h3>
                <div className="text-primary">{exp.company}</div>
                <div className="text-sm text-muted-foreground">{exp.location}</div>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-card-foreground">
                  {exp.responsibilities?.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
              <div className="text-muted-foreground md:text-right">{exp.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="mb-6 border-b border-border pb-2 text-2xl text-foreground">Skills</h2>
        <div className="space-y-4">
          {cv.skills?.map((category, index) => (
            <div key={index}>
              <h3 className="mb-2 font-medium text-foreground">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-border px-3 py-1 text-sm text-card-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="mb-12">
        <h2 className="mb-6 border-b border-border pb-2 text-2xl text-foreground">Awards & Honors</h2>
        <div className="space-y-4">
          {cv.awards?.map((award, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 md:grid-cols-[auto_1fr]">
              <div className="w-16 text-primary">{award.year}</div>
              <div>
                <h3 className="font-medium text-foreground">{award.title}</h3>
                <div className="text-sm text-muted-foreground">{award.details}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

