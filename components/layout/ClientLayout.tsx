'use client';

import { ThemeProvider } from '@/lib/contexts/ThemeContext';
import { MotionProvider } from '@/components/ui/MotionProvider';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SideSocial } from './SideSocial';
import { SideEmail } from './SideEmail';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <SideSocial />
          <SideEmail />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </MotionProvider>
    </ThemeProvider>
  );
}
