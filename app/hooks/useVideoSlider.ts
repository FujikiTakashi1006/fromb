import { useState, useEffect, useCallback } from 'react';
import { Video } from '../types';

export const useVideoSlider = (videos: Video[]) => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const changeVideo = useCallback((index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveVideo(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        changeVideo((activeVideo + 1) % videos.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeVideo, isAnimating, videos.length, changeVideo]);

  return {
    activeVideo,
    isAnimating,
    changeVideo,
  };
};