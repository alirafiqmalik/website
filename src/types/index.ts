// Content types for markdown frontmatter

export interface ProjectImage {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  img?: string; // Legacy single image support
  thumbnailImage?: ProjectImage; // Image for project card on list page
  detailImages?: ProjectImage[]; // Images for detail page header
  category: string;
  importance?: number;
  technologies?: string[];
  status?: string;
  links?: {
    github?: string;
    demo?: string;
    paper?: string;
    docs?: string;
  };
}

export interface Publication {
  slug: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: 'Conference' | 'Journal' | 'Workshop' | 'Preprint';
  award?: string;
  abstract?: string;
  links?: {
    pdf?: string;
    doi?: string;
    code?: string;
  };
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags?: string[];
  featured?: boolean;
}

export interface HistoryItem {
  slug: string;
  year: string;
  month: string;
  title: string;
  type: 'Professional' | 'Education' | 'Award';
  organization: string;
  description: string;
  details?: string[];
  color?: string;
}

export interface NewsItem {
  date: string;
  title: string;
  description: string;
}

export interface ResearchInterest {
  title: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
  details?: string;
  advisor?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  year: string;
  responsibilities: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Award {
  year: string;
  title: string;
  details: string;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  location: string;
  website?: string;
  profileImage?: string;
  socials: {
    github?: string;
    linkedin?: string;
    scholar?: string;
    twitter?: string;
  };
}

export interface CVData {
  contact: {
    email: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
    scholar?: string;
    twitter?: string;
  };
  education: Education[];
  experience: Experience[];
  skills: SkillCategory[];
  awards: Award[];
  interests: string[];
}

export interface HomeData {
  researchInterests: ResearchInterest[];
  selectedPublications: {
    title: string;
    venue: string;
    authors: string;
  }[];
}

// Parsed content with body
export interface ContentWithBody<T> {
  data: T;
  content: string;
  slug: string;
}

