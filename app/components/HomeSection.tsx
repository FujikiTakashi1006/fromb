'use client';

import { useEffect, useState } from 'react';

export default function HomeSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // メッセージ表示の1秒後にスクロールインジケーターを表示
      setTimeout(() => {
        setShowScrollIndicator(true);
      }, 1000);
    }, 4000); // 4秒後に表示
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      // スクロールを無効にする
      document.body.style.overflow = 'hidden';
    } else {
      // スクロールを有効にする
      document.body.style.overflow = 'auto';
    }

    // クリーンアップ
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoaded]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
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
      
      {/* Dark overlay */}
      <div className={`absolute inset-0 z-10 transition-all duration-1000 ${
        isLoaded ? 'bg-black/40' : 'bg-black/0'
      }`}></div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              A Message<br />Beyond Words
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 font-thin tracking-[0.3em] mb-12 max-w-3xl mx-auto">
            言葉以上のメッセージを
          </p>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 ${
        showScrollIndicator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex flex-col items-center space-y-2">
          <div className="text-white/60 text-sm font-light tracking-widest animate-pulse">
            SCROLL
          </div>
          <div className="w-px h-12 bg-white/40 relative">
            <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-white/80 transform -translate-x-1/2 animate-slide-down"></div>
          </div>
        </div>
      </div>
    </div>
  );
}