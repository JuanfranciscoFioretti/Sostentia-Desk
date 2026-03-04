import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

let postsDirectory: string | null = null;

function getPostsDirectory(): string {
  if (postsDirectory) return postsDirectory;
  postsDirectory = path.join(process.cwd(), 'content/blog');
  return postsDirectory;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
  content: string;
}

export function getPostBySlug(slug: string, locale: string): BlogPost | null {
  try {
    const fullPath = path.join(getPostsDirectory(), locale, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      image: data.image,
      tags: data.tags || [],
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(locale: string): BlogPost[] {
  try {
    const localeDir = path.join(getPostsDirectory(), locale);
    
    if (!fs.existsSync(localeDir)) {
      return [];
    }

    const fileNames = fs.readdirSync(localeDir);

    const posts = fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        return getPostBySlug(slug, locale);
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

    return posts;
  } catch {
    return [];
  }
}
