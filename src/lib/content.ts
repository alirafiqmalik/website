import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ContentWithBody } from '@/types';

const contentDirectory = path.join(process.cwd(), 'src/content');

/**
 * Get a single page content file (e.g., personal.md, cv.md)
 */
export function getPageContent<T>(filename: string): ContentWithBody<T> {
  const filePath = path.join(contentDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    data: data as T,
    content,
    slug: filename.replace(/\.mdx?$/, ''),
  };
}

/**
 * Get all content files from a folder
 */
export function getAllContent<T>(folder: string): ContentWithBody<T>[] {
  const folderPath = path.join(contentDirectory, folder);
  
  if (!fs.existsSync(folderPath)) {
    return [];
  }
  
  const filenames = fs.readdirSync(folderPath).filter(
    (file) => file.endsWith('.md') || file.endsWith('.mdx')
  );
  
  return filenames.map((filename) => {
    const filePath = path.join(folderPath, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = filename.replace(/\.mdx?$/, '');
    
    return {
      data: { ...data, slug } as T,
      content,
      slug,
    };
  });
}

/**
 * Get a single content item by slug from a folder
 */
export function getContentBySlug<T>(folder: string, slug: string): ContentWithBody<T> | null {
  const folderPath = path.join(contentDirectory, folder);
  
  // Try .mdx first, then .md
  const mdxPath = path.join(folderPath, `${slug}.mdx`);
  const mdPath = path.join(folderPath, `${slug}.md`);
  
  let filePath: string;
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    data: { ...data, slug } as T,
    content,
    slug,
  };
}

/**
 * Get all slugs from a folder (for generateStaticParams)
 */
export function getAllSlugs(folder: string): string[] {
  const folderPath = path.join(contentDirectory, folder);
  
  if (!fs.existsSync(folderPath)) {
    return [];
  }
  
  return fs.readdirSync(folderPath)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}
