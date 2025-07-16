'use client';

import { useEffect, useState } from 'react';

export default function HomeSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 4000); // 4秒後に表示
    
    return () => clearTimeout(timer);
  }, []);

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
          
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide mb-12 max-w-3xl mx-auto">
            言葉以上のメッセージを
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              作品を見る
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-white/50 text-white rounded-full font-medium hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              お問い合わせ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}