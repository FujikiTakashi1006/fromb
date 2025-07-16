'use client';

import { useEffect, useState } from 'react';
import Navigation from './Navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    // Show navigation at the same time as the home text (4 seconds)
    const timer = setTimeout(() => {
      setShowNavigation(true);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showNavigation && <Navigation />}
      {children}
    </>
  );
}