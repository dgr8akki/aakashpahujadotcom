'use client';

import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <svg
      width="42"
      height="48"
      viewBox="0 0 220 253"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M110.058 4.125L4 63.9528V186.328L110.058 248.875L216.117 189.047V66.6722L110.058 4.125Z"
        fill="#000000"
        stroke="#FF9E64"
        strokeWidth="7"
      />
      <path
        d="M107.826 85.7122H121.826L154.866 171.672H140.026L131.206 147.872H98.3061L89.4861 171.672H74.7861L107.826 85.7122ZM114.686 103.492L102.926 135.272H126.446L114.686 103.492Z"
        fill="#FF9E64"
      />
    </svg>
  );
}
