'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Navigation from './Navigation';
import { useVideoSlider } from '../hooks/useVideoSlider';
import { Video } from '../types';

export default function WorksSection() {
  const [showContent, setShowContent] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showWorksContent, setShowWorksContent] = useState(false);

  const videos = useMemo<Video[]>(() => [
    {
      id: 'iuhFpC_Hd7s',
      title: '映像作品1',
      url: 'https://youtu.be/iuhFpC_Hd7s?si=pj7zrabZcEEM-O8d',
      description: '独自の視点で捉えた日常の美しさを表現した作品。光と影の対比が印象的な映像詩です。'
    },
    {
      id: 'OHKQ9qmgzMM',
      title: '映像作品2',
      url: 'https://youtu.be/OHKQ9qmgzMM?si=DdxEWvl-cCOE68nD',
      description: '都市の喧騒と静寂を対比させた実験的映像作品。現代社会の矛盾を鋭く切り取ります。'
    },
    {
      id: 'BKRR6jc1RGE',
      title: '映像作品3',
      url: 'https://youtu.be/BKRR6jc1RGE?si=MudoWNZ5wS55AFrx',
      description: '自然と人間の共生をテーマにした叙情的な映像。心に響く音楽とともに贈る感動作。'
    },
    {
      id: 'd1_zrKLEhwQ',
      title: '映像作品4',
      url: 'https://youtu.be/d1_zrKLEhwQ?si=4NPy7s_3doPvRRow',
      description: '革新的な撮影技法を駆使した前衛的作品。見る者の想像力を刺激する映像体験。'
    },
    {
      id: '27wp7YMh3og',
      title: '映像作品5',
      url: 'https://youtu.be/27wp7YMh3og?si=Vz8xZNZyfJ1eF6LP',
      description: '日常の一瞬を切り取った詩的な映像集。何気ない瞬間に宿る美しさを再発見させてくれます。'
    }
  ], []);

  const { activeVideo, isAnimating, changeVideo } = useVideoSlider(videos);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      
      setTimeout(() => {
        setShowTitle(true);
        
        setTimeout(() => {
          setShowWorksContent(true);
        }, 1200);
      }, 300);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <Navigation />
      
      <div 
        className={`relative z-10 pt-24 transition-all duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-full flex justify-center mb-8">
          <div className="w-full max-w-7xl px-12 flex justify-end overflow-hidden">
            <h1 
              className={`text-9xl font-extralight text-white tracking-widest opacity-90 font-sans transition-all duration-1000 ease-out ${
                showTitle ? 'translate-y-0 opacity-90' : 'translate-y-24 opacity-0'
              }`}
              style={{
                letterSpacing: '0.2em',
                textShadow: showTitle ? '0 0 15px rgba(255,255,255,0.5)' : 'none'
              }}
            >
              WORKS
            </h1>
          </div>
        </div>
        
        <div className={`flex items-start gap-20 max-w-7xl mx-auto px-12 transition-all duration-1000 ${
          showWorksContent ? 'opacity-100' : 'opacity-0'
        }`}>
          <div 
            className={`w-[600px] transition-all duration-1000 ease-out ${
              showWorksContent ? 'translate-x-0 rotate-y-0' : '-translate-x-12 -rotate-y-3'
            }`}
            style={{ 
              transformOrigin: 'left center'
            }}
          >
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <div className="relative aspect-video bg-black">
                <Image
                  src={`https://img.youtube.com/vi/${videos[activeVideo].id}/maxresdefault.jpg`}
                  alt={videos[activeVideo].title}
                  className="absolute inset-0 w-full h-full object-cover"
                  fill
                  sizes="600px"
                />
              </div>
            </div>
            
            <div className="flex mt-4 space-x-2 justify-center">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeVideo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeVideo === index ? 'bg-white scale-125' : 'bg-white/40'
                  }`}
                  aria-label={`動画 ${index + 1} を表示`}
                />
              ))}
            </div>
            
            <div className="mt-6 text-white/60 text-[10px] leading-tight">
              関係者各位<br />
              当Webサイトに掲載されている作品について、水﨑一輝の作例紹介を目的としております。<br />
              ご不都合があればメールにてご連絡いただきますと幸いです。
            </div>
          </div>
          
          <div 
            className={`w-[350px] text-left flex flex-col justify-center transition-all duration-1000 ease-out ${
              showWorksContent ? 'translate-x-0 rotate-y-0' : 'translate-x-12 rotate-y-3'
            }`}
            style={{ 
              transformOrigin: 'right center',
              transitionDelay: '0.2s'
            }}
          >
            <div className="transition-opacity duration-500 ease-in-out" style={{ opacity: isAnimating ? 0 : 1 }}>
              <h2 className="text-2xl font-light tracking-wider text-white mb-3">{videos[activeVideo].title}</h2>
              <p className="text-white/80 text-sm mb-4 leading-relaxed">
                {videos[activeVideo].description}
              </p>
              <a 
                href={videos[activeVideo].url}
                target="_blank"
                rel="noopener noreferrer"
                className="z-50 inline-flex items-center space-x-2 text-white border border-white/30 px-3 py-1.5 rounded-sm hover:bg-white/10 transition-colors duration-300 text-sm relative pointer-events-auto"
              >
                <span>視聴する</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}