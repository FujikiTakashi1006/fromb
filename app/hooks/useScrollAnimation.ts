import { useState, useEffect, useCallback } from 'react';
import { ScrollAnimationState } from '../types';

export const useScrollAnimation = () => {
  const [state, setState] = useState<ScrollAnimationState>({
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

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setState(prev => ({ ...prev, targetScrollY: currentScrollY }));
    
    if (currentScrollY > 800 && !state.showWorks) {
      setState(prev => ({ ...prev, showWorks: true }));
      
      setTimeout(() => {
        setState(prev => ({ ...prev, showWorksTitle: true }));
        
        setTimeout(() => {
          setState(prev => ({ ...prev, showWorksContent: true }));
        }, 1200);
      }, 300);
    }
    
    if (currentScrollY > 1500 && !state.showContact) {
      setTimeout(() => {
        setState(prev => ({ ...prev, showContact: true }));
      }, 300);
    } else if (currentScrollY <= 1500 && state.showContact) {
      setState(prev => ({ ...prev, showContact: false }));
    }
  }, [state.showWorks, state.showContact]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    document.body.style.overflow = 'hidden';
    
    const gradientTimer = setTimeout(() => {
      setState(prev => ({ ...prev, showGradient: true, showMenu: true }));
      
      setTimeout(() => {
        setState(prev => ({ ...prev, showText: true }));
        
        setTimeout(() => {
          document.body.style.overflow = 'auto';
          document.documentElement.style.overflow = 'auto';
        }, 500);
      }, 1000);
    }, 3000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(gradientTimer);
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [handleScroll]);

  useEffect(() => {
    let animationFrameId: number;
    
    const animateScroll = () => {
      setState(prev => ({
        ...prev,
        scrollY: (() => {
          const easing = 0.08;
          const newScrollY = prev.scrollY + (prev.targetScrollY - prev.scrollY) * easing;
          
          if (Math.abs(prev.targetScrollY - newScrollY) < 0.1) {
            return prev.targetScrollY;
          }
          
          return newScrollY;
        })()
      }));
      
      animationFrameId = requestAnimationFrame(animateScroll);
    };
    
    animationFrameId = requestAnimationFrame(animateScroll);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [state.targetScrollY]);

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