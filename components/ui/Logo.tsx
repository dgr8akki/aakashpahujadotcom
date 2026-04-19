'use client';

import React from 'react';

interface LogoProps {
  className?: string;
}

/**
 * Hex-clipped brand mark with an amber serif "A" — matches the Portfolio
 * design handoff's `.brand-mark` element.
 */
export function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-mono text-[13px] text-ink ${className}`}>
      <span
        aria-hidden
        className="relative grid place-items-center w-[34px] h-[34px] border border-line-2"
        style={{
          background: 'linear-gradient(135deg,#1a1124,#231732)',
          clipPath:
            'polygon(25% 6%,75% 6%,98% 50%,75% 94%,25% 94%,2% 50%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1px 0 rgba(0,0,0,.5),0 4px 18px -6px rgba(244,165,82,.3)',
        }}
      >
        <span className="font-serif text-[20px] leading-none text-amber">A</span>
      </span>
      <span>
        aakashpahuja<span className="text-amber">.dev</span>
      </span>
    </span>
  );
}
