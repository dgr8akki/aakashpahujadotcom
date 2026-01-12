'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faTwitter,
  faCodepen,
} from '@fortawesome/free-brands-svg-icons';
import {
  faExternalLinkAlt,
  faFolder,
  faStar,
  faCodeBranch,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const iconMap: Record<string, IconDefinition> = {
  Github: faGithub,
  Linkedin: faLinkedin,
  Instagram: faInstagram,
  Twitter: faTwitter,
  Codepen: faCodepen,
  ExternalLink: faExternalLinkAlt,
  Folder: faFolder,
  Star: faStar,
  GitFork: faCodeBranch,
  MapPin: faMapMarkerAlt,
};

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className = '' }: IconProps) {
  const icon = iconMap[name];

  if (!icon) {
    return null;
  }

  return (
    <FontAwesomeIcon
      icon={icon}
      style={{ width: size, height: size }}
      className={className}
    />
  );
}

// Export individual icons for direct use
export const Icons = {
  Github: faGithub,
  Linkedin: faLinkedin,
  Instagram: faInstagram,
  Twitter: faTwitter,
  Codepen: faCodepen,
  ExternalLink: faExternalLinkAlt,
  Folder: faFolder,
  Star: faStar,
  GitFork: faCodeBranch,
  MapPin: faMapMarkerAlt,
};
