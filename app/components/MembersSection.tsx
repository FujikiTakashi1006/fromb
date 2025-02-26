'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const MembersSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showGradient, setShowGradient] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showText, setShowText] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 最初はスクロールを無効にする
    document.body.style.overflow = 'hidden';
    
    const gradientTimer = setTimeout(() => {
      setShowGradient(true);
      setShowMenu(true);
      
      setTimeout(() => {
        setShowText(true);
        
        // テキストが表示された後にスクロールを有効にする
        setTimeout(() => {
          document.body.style.overflow = '';
        }, 500);
      }, 1000);
    }, 3000);
    
    // スクロールを有効にするためのダミー要素の高さを設定
    document.body.style.height = '300vh';
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(gradientTimer);
      document.body.style.height = '';
      document.body.style.overflow = '';
    };
  }, []);

  const creators = [
    {
      name: 'そのさん',
      role: 'Influencer / Video Director',
      image: 'https://placehold.co/400x600/orange/white?text=Creator1'
    },
    {
      name: 'あああつし',
      role: 'Influencer / Video Director',
      image: 'https://placehold.co/400x600/gray/white?text=Creator2'
    },
    {
      name: 'SHOT4',
      role: 'Video Creator',
      image: 'https://placehold.co/400x600/navy/white?text=Creator3'
    },
  ];

  return (
    <>
      <div className="fixed inset-0 overflow-hidden">
        <section className="relative h-screen flex items-center overflow-hidden">
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
            className={`absolute inset-0 bg-white transition-opacity duration-700 ease-in-out z-10`}
            style={{ opacity: Math.min(scrollY / 500, 1) }}
          ></div>
          
          <div 
            className={`absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-700 via-red-500/50 to-red-500/0 transition-opacity duration-1000 ${
              showGradient ? 'opacity-100' : 'opacity-0'
            } z-20`}
            style={{ opacity: Math.max(showGradient ? 1 - scrollY / 300 : 0, 0) }}
          ></div>
          
          <div 
            className={`absolute bottom-24 left-12 z-30 text-white overflow-hidden transition-all duration-1000 ${
              showText ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
            style={{ opacity: Math.max(showText ? 1 - scrollY / 200 : 0, 0) }}
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
          
          <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${
              showMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <div className="flex justify-between items-center px-8 text-white py-7 backdrop-blur-lg">
              <div className="font-light tracking-wider text-2xl">
                fromB
              </div>
              <div className="flex space-x-8">
                <Link href="#" className="relative group overflow-hidden py-2">
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-red-300 font-light tracking-widest text-base">HOME</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
                <Link href="#" className="relative group overflow-hidden py-2">
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-red-300 font-light tracking-widest text-base">WORKS</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
                <Link href="#contact" className="relative group overflow-hidden py-2">
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-red-300 font-light tracking-widest text-base">CONTACT</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
              </div>
            </div>
          </nav>
        </section>
      </div>
      
      {/* スクロール用のダミー要素 */}
      <div style={{ height: '200vh' }} className="invisible"></div>
    </>
  );
};

export default MembersSection; 