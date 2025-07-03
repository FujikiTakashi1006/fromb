// This hook is no longer used after page separation but kept for potential future use
import { useState, useCallback } from 'react';
import { ScrollAnimationState } from '../types';

export const useScrollAnimation = () => {
  const [state] = useState<ScrollAnimationState>({
    scrollY: 0,
    targetScrollY: 0,
    showGradient: false,
    showMenu: false,
    showText: false,
    showRedGradient: false,
    showWorks: false,
    showWorksTitle: false,
    showWorksContent: false,
    showContact: false,
  });

  const scrollToSection = useCallback((sectionId: string) => {
    const targetPosition = sectionId === 'works' 
      ? 900
      : sectionId === 'contact' 
        ? 1600
        : 0;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }, []);

  return {
    ...state,
    scrollToSection,
  };
};