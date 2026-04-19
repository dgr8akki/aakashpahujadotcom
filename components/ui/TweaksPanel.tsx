'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/contexts/ThemeContext';

type Accent = 'amber' | 'iris' | 'sage' | 'rose';

const ACCENTS: { id: Accent; swatch: string }[] = [
  { id: 'amber', swatch: 'linear-gradient(135deg,#F8C9A0,#F4A552)' },
  { id: 'iris', swatch: 'linear-gradient(135deg,#D4C9F8,#B8A8F0)' },
  { id: 'sage', swatch: 'linear-gradient(135deg,#C9E0CE,#9EC6A6)' },
  { id: 'rose', swatch: 'linear-gradient(135deg,#F4B0B0,#E87B7B)' },
];

const TAGLINES = [
  {
    id: 'scalable',
    label: 'Scalable',
    html: 'I build scalable solutions <em>for the web</em>, one line at a time.',
  },
  {
    id: 'interfaces',
    label: 'Interfaces',
    html: 'I craft <em>interfaces</em> that feel inevitable.',
  },
  {
    id: 'systems',
    label: 'Systems',
    html: 'I design <em>systems</em> that engineers love to build on.',
  },
] as const;

type TaglineId = (typeof TAGLINES)[number]['id'];

const STORAGE_KEY = 'portfolio.tweaks.v1';

interface StoredTweaks {
  accent: Accent;
  tagline: TaglineId;
}

export function TweaksPanel() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState<Accent>('amber');
  const [tagline, setTagline] = useState<TaglineId>('scalable');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredTweaks;
        if (parsed.accent) setAccent(parsed.accent);
        if (parsed.tagline) setTagline(parsed.tagline);
      }
    } catch {
      // ignore corrupted storage
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.dataset.accent = accent;
  }, [accent, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const node = document.querySelector('[data-hero-sub]') as HTMLElement | null;
    if (node) {
      node.innerHTML = TAGLINES.find((t) => t.id === tagline)!.html.replace(
        /<em>/g,
        '<em class="gradient-name italic">'
      );
    }
  }, [tagline, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accent, tagline } satisfies StoredTweaks)
      );
    } catch {
      // ignore
    }
  }, [accent, tagline, mounted]);

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="tweaks-panel"
        className="fixed bottom-5 right-5 z-[100] grid place-items-center w-11 h-11 rounded-full border border-line-2 bg-bg-2/80 backdrop-blur-md text-amber hover:text-amber-2 transition-colors"
        title="Tweaks"
      >
        ✦
      </button>

      {open && (
        <aside
          id="tweaks-panel"
          className="fixed bottom-[72px] right-5 z-[100] w-[280px] p-[18px] rounded-[16px] border border-line-2 font-mono text-[12px] text-ink"
          style={{
            background: 'rgba(22,14,28,0.95)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 30px 60px -28px rgba(0,0,0,0.8)',
          }}
          role="region"
          aria-label="Appearance tweaks"
        >
          <h4 className="m-0 mb-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
            ✦ Tweaks
          </h4>

          <TweakRow label="Accent">
            <div className="flex gap-2 flex-wrap">
              {ACCENTS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAccent(a.id)}
                  aria-label={`Accent ${a.id}`}
                  aria-pressed={accent === a.id}
                  className={`w-7 h-7 rounded-full border-2 ${
                    accent === a.id
                      ? 'border-ink shadow-[0_0_0_2px_var(--color-amber)]'
                      : 'border-line-2'
                  }`}
                  style={{ background: a.swatch }}
                />
              ))}
            </div>
          </TweakRow>

          <TweakRow label="Theme">
            <ToggleGroup>
              <ToggleButton
                active={theme === 'dark'}
                onClick={() => theme !== 'dark' && toggleTheme()}
              >
                Dark
              </ToggleButton>
              <ToggleButton
                active={theme === 'light'}
                onClick={() => theme !== 'light' && toggleTheme()}
              >
                Light
              </ToggleButton>
            </ToggleGroup>
          </TweakRow>

          <TweakRow label="Tagline">
            <ToggleGroup>
              {TAGLINES.map((t) => (
                <ToggleButton
                  key={t.id}
                  active={tagline === t.id}
                  onClick={() => setTagline(t.id)}
                >
                  {t.label}
                </ToggleButton>
              ))}
            </ToggleGroup>
          </TweakRow>
        </aside>
      )}
    </>
  );
}

function TweakRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3.5 last:mb-0">
      <label className="block mb-1.5 text-[10.5px] uppercase tracking-[0.1em] text-ink-mute">
        {label}
      </label>
      {children}
    </div>
  );
}

function ToggleGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-1.5 flex-wrap">{children}</div>;
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex-1 px-1 py-1.5 rounded-md border font-mono text-[10px] transition-colors ${
        active
          ? 'bg-[rgba(244,165,82,0.14)] border-amber text-amber'
          : 'bg-white/[0.04] border-line-2 text-ink-dim hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}
