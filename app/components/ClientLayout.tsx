'use client';

import { useEffect, useState } from 'react';
import Navigation from './Navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    // Show navigation immediately for the new modern design
    const timer = setTimeout(() => {
      setShowNavigation(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showNavigation && <Navigation />}
      {children}
    </>
  );
}