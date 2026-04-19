'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faXTwitter,
  faCodepen,
  faStackOverflow,
} from '@fortawesome/free-brands-svg-icons';
import {
  faExternalLinkAlt,
  faFolder,
  faStar,
  faCodeBranch,
  faMapMarkerAlt,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const iconMap: Record<string, IconDefinition> = {
  Github: faGithub,
  Linkedin: faLinkedin,
  Instagram: faInstagram,
  Twitter: faXTwitter,
  X: faXTwitter,
  Codepen: faCodepen,
  Stack: faLayerGroup,
  StackOverflow: faStackOverflow,
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

export const Icons = iconMap;
