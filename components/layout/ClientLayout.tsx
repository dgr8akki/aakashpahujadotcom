'use client';

import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SideSocial } from './SideSocial';
import { SideEmail } from './SideEmail';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SideSocial />
      <SideEmail />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
