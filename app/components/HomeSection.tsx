'use client';

import { useEffect, useState } from 'react';
import Navigation from './Navigation';

export default function HomeSection() {
  const [showGradient, setShowGradient] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const gradientTimer = setTimeout(() => {
      setShowGradient(true);
      
      setTimeout(() => {
        setShowText(true);
        
        setTimeout(() => {
          setShowNav(true);
          document.body.style.overflow = 'auto';
          document.documentElement.style.overflow = 'auto';
        }, 800);
      }, 800);
    }, 1500);
    
    return () => {
      clearTimeout(gradientTimer);
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
          お使いのブラウザは動画をサポートしていません
        </video>
      </div>
      
      <div 
        className={`absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-700 via-red-500/50 to-red-500/0 transition-opacity duration-1000 ${
          showGradient ? 'opacity-100' : 'opacity-0'
        } z-10`}
      ></div>
      
      <div 
        className={`absolute bottom-24 left-12 z-40 text-white overflow-hidden transition-all duration-1000 ${
          showText ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="transform transition-transform duration-1000 ease-in-out" 
            style={{
              transform: showText ? 'translateY(0)' : 'translateY(100%)'
            }}>
          <h1 className="text-7xl font-bold mb-4 leading-tight tracking-tighter">
            映像が<br />世界を変える
          </h1>
          <p className="text-2xl font-extralight tracking-widest">
            IMAGE CHANGE THE WORLD.
          </p>
        </div>
      </div>
      
      {showNav && <Navigation />}
    </div>
  );
}