import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function kebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// ponytail: cards and index rows show one line; the full text stays in the Markdown
export function firstSentence(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  const match = clean.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : clean;
}

// "February 2025 - Present" -> "2025", "August 2016 - May 2019" -> "2016"
export function startYear(range: string): string {
  return range.match(/\d{4}/)?.[0] ?? '';
}

export function endYear(range: string): string {
  const years = range.match(/\d{4}/g) ?? [];
  return /present/i.test(range) ? 'now' : years[years.length - 1] ?? '';
}
