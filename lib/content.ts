import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadingTime, kebabCase } from './utils';

const contentDirectory = path.join(process.cwd(), 'content');

// Types
export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  readingTime: string;
}

export interface Job {
  company: string;
  title: string;
  location: string;
  range: string;
  url: string;
  content: string;
  order: number;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  external?: string;
  content: string;
  order?: number;
}

export interface FeaturedProject {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  external?: string;
  cover?: string;
  content: string;
  order?: number;
}

// Blog Posts
export function getAllPosts(): Post[] {
  const postsDirectory = path.join(contentDirectory, 'posts');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const folders = fs.readdirSync(postsDirectory);
  
  const posts = folders
    .filter((folder) => {
      const folderPath = path.join(postsDirectory, folder);
      return fs.statSync(folderPath).isDirectory();
    })
    .map((folder) => {
      const filePath = path.join(postsDirectory, folder, 'index.md');
      
      if (!fs.existsSync(filePath)) {
        return null;
      }

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      // Skip drafts
      if (data.draft === true) {
        return null;
      }

      return {
        slug: folder,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        tags: data.tags || [],
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagCount: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) =>
    post.tags.some((t) => kebabCase(t) === kebabCase(tag))
  );
}

// Jobs
export function getAllJobs(): Job[] {
  const jobsDirectory = path.join(contentDirectory, 'jobs');
  
  if (!fs.existsSync(jobsDirectory)) {
    return [];
  }

  const folders = fs.readdirSync(jobsDirectory);
  
  const jobs = folders
    .filter((folder) => {
      const folderPath = path.join(jobsDirectory, folder);
      return fs.statSync(folderPath).isDirectory();
    })
    .map((folder) => {
      const filePath = path.join(jobsDirectory, folder, 'index.md');
      
      if (!fs.existsSync(filePath)) {
        return null;
      }

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        company: data.company || folder,
        title: data.title || '',
        location: data.location || '',
        range: data.range || '',
        url: data.url || '',
        content,
        order: data.order || 0,
      };
    })
    .filter((job): job is Job => job !== null)
    .sort((a, b) => a.order - b.order);

  return jobs;
}

// Featured Projects
export function getFeaturedProjects(): FeaturedProject[] {
  const featuredDirectory = path.join(contentDirectory, 'featured');
  
  if (!fs.existsSync(featuredDirectory)) {
    return [];
  }

  const folders = fs.readdirSync(featuredDirectory);
  
  const projects = folders
    .filter((folder) => {
      const folderPath = path.join(featuredDirectory, folder);
      return fs.statSync(folderPath).isDirectory();
    })
    .map((folder) => {
      const filePath = path.join(featuredDirectory, folder, 'index.md');
      
      if (!fs.existsSync(filePath)) {
        return null;
      }

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      // Convert relative cover path to absolute path for Next.js Image
      let coverPath = data.cover || '';
      if (coverPath && coverPath.startsWith('./')) {
        // Convert ./image.png to /images/featured/image.png (served from public folder)
        coverPath = `/images/featured/${coverPath.slice(2)}`;
      }

      return {
        title: data.title || '',
        description: data.description || '',
        tech: data.tech || [],
        github: data.github || '',
        external: data.external || '',
        cover: coverPath,
        content,
        order: data.order || 0,
      };
    })
    .filter((project): project is NonNullable<typeof project> => project !== null)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return projects;
}

// Other Projects
export function getOtherProjects(): Project[] {
  const projectsDirectory = path.join(contentDirectory, 'projects');
  
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(projectsDirectory).filter((file) => file.endsWith('.md'));
  
  const projects = files
    .map((file) => {
      const filePath = path.join(projectsDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        title: data.title || '',
        description: data.description || '',
        tech: data.tech || [],
        github: data.github || '',
        external: data.external || '',
        content,
        order: data.order || 0,
      };
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return projects;
}

// GitHub OSS Feed
export interface GithubRepo {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
}

function fallbackRepos(): GithubRepo[] {
  return getOtherProjects()
    .slice(0, 4)
    .map((p) => ({
      name: p.title,
      description: p.description,
      stars: 0,
      language: p.tech[0] || 'Code',
      url: p.github || p.external || '',
    }));
}

export interface GithubProfile {
  repos: GithubRepo[];
  publicRepoCount: number;
  username: string;
  htmlUrl: string;
  fetchedAt: string;
  live: boolean;
}

export async function getGithubProfile(
  username = 'dgr8akki'
): Promise<GithubProfile> {
  const base = 'https://api.github.com';
  const headers: HeadersInit = {
    'User-Agent': 'aakashpahujadotcom-build',
    Accept: 'application/vnd.github+json',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, repoRes] = await Promise.all([
      fetch(`${base}/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `${base}/users/${username}/repos?per_page=100&type=owner&sort=updated`,
        { headers, next: { revalidate: 3600 } }
      ),
    ]);

    if (!userRes.ok || !repoRes.ok) throw new Error('github non-200');

    const user = (await userRes.json()) as {
      public_repos: number;
      html_url: string;
    };
    const repos = (await repoRes.json()) as Array<{
      name: string;
      description: string | null;
      stargazers_count: number;
      language: string | null;
      html_url: string;
      fork: boolean;
      archived: boolean;
    }>;

    const top = repos
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4)
      .map<GithubRepo>((r) => ({
        name: r.name,
        description: r.description ?? '',
        stars: r.stargazers_count,
        language: r.language ?? 'Code',
        url: r.html_url,
      }));

    return {
      repos: top.length ? top : fallbackRepos(),
      publicRepoCount: user.public_repos,
      username,
      htmlUrl: user.html_url,
      fetchedAt: new Date().toISOString(),
      live: top.length > 0,
    };
  } catch {
    return {
      repos: fallbackRepos(),
      publicRepoCount: 119,
      username,
      htmlUrl: `https://github.com/${username}`,
      fetchedAt: new Date().toISOString(),
      live: false,
    };
  }
}

// Hero Content
export function getHeroContent(): { title: string; name: string; subtitle: string; content: string } | null {
  const filePath = path.join(contentDirectory, 'hero', 'index.md');
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title || '',
    name: data.name || '',
    subtitle: data.subtitle || '',
    content,
  };
}

// About Content
export function getAboutContent(): { title: string; skills: string[]; content: string } | null {
  const filePath = path.join(contentDirectory, 'about', 'index.md');
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title || 'About Me',
    skills: data.skills || [],
    content,
  };
}

// Skills Content
export function getSkillsContent(): { title: string; skills: string[]; content: string } | null {
  const filePath = path.join(contentDirectory, 'skills', 'index.md');
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title || 'Skills',
    skills: data.skills || [],
    content,
  };
}

// Contact Content
export function getContactContent(): { title: string; content: string } | null {
  const filePath = path.join(contentDirectory, 'contact', 'index.md');
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title || "What's Next?",
    content,
  };
}
