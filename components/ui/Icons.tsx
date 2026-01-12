'use client';

import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Codepen,
  ExternalLink,
  Folder,
  Star,
  GitFork,
  MapPin,
  type LucideIcon,
} from 'lucide-react';

export const Icons = {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Codepen,
  ExternalLink,
  Folder,
  Star,
  GitFork,
  MapPin,
} as const;

export type IconName = keyof typeof Icons;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className = '' }: IconProps) {
  const IconComponent = Icons[name] as LucideIcon;
  
  if (!IconComponent) {
    return null;
  }

  return <IconComponent size={size} className={className} />;
}
