'use client';

import { useEffect, useState } from 'react';

export default function HomeSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-5xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight">
            映像が<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              世界を変える
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 font-light tracking-wide mb-12 max-w-3xl mx-auto">
            独自の視点で映像制作を行うクリエイティブチーム fromB のポートフォリオサイト
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
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              お問い合わせ
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-indigo-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
    </div>
  );
}