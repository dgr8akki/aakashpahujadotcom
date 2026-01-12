'use client';

import { useState, useEffect } from 'react';
import { Loader } from '@/components/ui/Loader';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SideSocial } from './SideSocial';
import { SideEmail } from './SideEmail';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoaderFinish = () => {
    setIsLoading(false);
    setShowContent(true);
    sessionStorage.setItem('hasLoaded', 'true');
  };

  return (
    <>
      {isLoading && <Loader onFinish={handleLoaderFinish} />}
      <div
        className={`min-h-screen flex flex-col transition-opacity duration-300 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navbar />
        <SideSocial />
        <SideEmail />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
