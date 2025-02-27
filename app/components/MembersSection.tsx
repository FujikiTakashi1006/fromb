'use client';

import { useEffect, useRef, useState } from 'react';

const MembersSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showGradient, setShowGradient] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showText, setShowText] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showRedGradient, setShowRedGradient] = useState(false);
  const [showWorks, setShowWorks] = useState(false);
  const [showWorksTitle, setShowWorksTitle] = useState(false);
  const [showWorksContent, setShowWorksContent] = useState(false);
  const [showContact, setShowContact] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // WORKSセクションが表示されるタイミングを調整
      if (currentScrollY > 800 && !showWorks) {
        setShowWorks(true);
        
        // WORKSタイトルを表示
        setTimeout(() => {
          setShowWorksTitle(true);
          
          // タイトル表示から1.2秒後にコンテンツを表示
          setTimeout(() => {
            setShowWorksContent(true);
          }, 1200);
        }, 300);
      }
      
      // さらに下にスクロールしたら赤白グラデーションを表示
      if (currentScrollY > 1500 && !showRedGradient) {
        setShowRedGradient(true);
        console.log("赤白グラデーション表示: ON");
        
        // 赤白グラデーション表示の0.8秒後にコンタクトフォームを表示
        setTimeout(() => {
          setShowContact(true);
        }, 800);
      } else if (currentScrollY <= 1500 && showRedGradient) {
        setShowRedGradient(false);
        setShowContact(false);
        console.log("赤白グラデーション表示: OFF");
      }
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
  }, [showWorks, showRedGradient]);

  // スライドショーのデータ
  const videos = [
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
  ];

  // 自動切り替え
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setActiveVideo(prev => (prev + 1) % videos.length);
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAnimating, videos.length]);

  // スクロール関数
  const scrollToSection = (sectionId: string) => {
    const targetPosition = sectionId === 'works' 
      ? 900  // WORKSセクションの位置
      : sectionId === 'contact' 
        ? 1600  // CONTACTセクションの位置
        : 0;    // HOMEの位置
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-opacity duration-1000"
              style={{ 
                opacity: Math.max(1 - scrollY / 400, 0)
              }}
            >
              <source src="/bg.mp4" type="video/mp4" />
              お使いのブラウザは動画をサポートしていません
            </video>
          </div>
          {/* コンテンツエリア - WORKSの見出しと内容を含む */}
          <div 
            className="absolute top-24 left-0 w-full z-50"
            style={{ 
              opacity: Math.min(Math.max((scrollY - 800) / 150, 0), 1) * Math.max(1 - (scrollY - 1500) / 300, 0)
            }}
          >
            {/* WORKSの見出し - 背景色付きで全幅 */}
            <div className="w-full flex justify-center mb-8">
              <div className="w-full max-w-7xl px-12 flex justify-end overflow-hidden">
                <h2 
                  className={`text-9xl font-extralight text-white tracking-widest opacity-90 font-sans transition-all duration-1000 ease-out`}
                  style={{
                    transform: showWorksTitle 
                      ? `translateY(${Math.min(Math.max((scrollY - 800) / 2, -100), 0)}px)` 
                      : 'translateY(100px)',
                    opacity: showWorksTitle ? 0.9 : 0,
                    letterSpacing: '0.2em',
                    textShadow: showWorksTitle ? '0 0 15px rgba(255,255,255,0.5)' : 'none'
                  }}
                >
                  WORKS
                </h2>
              </div>
            </div>
            
            {/* コンテンツ - 背景色付きで全幅 */}
                <div className="flex items-start gap-20 max-w-7xl mx-auto px-12">
                  {/* 左側：サムネイル - 上に配置 */}
                  <div 
                    className={`w-[600px] -mt-8 transition-all duration-1000 ease-out`}
                    style={{ 
                      opacity: showWorksContent ? 1 : 0,
                      transform: showWorksContent ? 'translateX(0) rotateY(0)' : 'translateX(-50px) rotateY(-10deg)',
                      transformOrigin: 'left center'
                    }}
                  >
                    <div 
                      ref={sliderRef}
                      className="relative overflow-hidden rounded-lg shadow-2xl"
                    >
                      <div className="relative aspect-video bg-black">
                        <img
                          src={`https://img.youtube.com/vi/${videos[activeVideo].id}/maxresdefault.jpg`}
                          alt={videos[activeVideo].title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex mt-4 space-x-2 justify-center">
                      {videos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setIsAnimating(true);
                            setActiveVideo(index);
                            setTimeout(() => setIsAnimating(false), 500);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            activeVideo === index ? 'bg-white scale-125' : 'bg-white/40'
                          }`}
                          aria-label={`動画 ${index + 1} を表示`}
                        />
                      ))}
                    </div>
                    
                    {/* 著作権表記 - 控えめに */}
                    <div className="mt-6 text-white/60 text-[10px] leading-tight">
                      関係者各位<br />
                      当Webサイトに掲載されている作品について、水﨑一輝の作例紹介を目的としております。<br />
                      ご不都合があればメールにてご連絡いただきますと幸いです。
                    </div>
                  </div>
                  
                  {/* 右側：説明文 - 左寄せ */}
                  <div 
                    className={`w-[350px] text-left flex flex-col justify-center transition-all duration-1000 ease-out`}
                    style={{ 
                      opacity: showWorksContent ? 1 : 0,
                      transform: showWorksContent ? 'translateX(0) rotateY(0)' : 'translateX(50px) rotateY(10deg)',
                      transformOrigin: 'right center',
                      transitionDelay: '0.2s'
                    }}
                  >
                    <div className="transition-opacity duration-500 ease-in-out" style={{ opacity: isAnimating ? 0 : 1 }}>
                      <h3 className="text-2xl font-light tracking-wider text-white mb-3">{videos[activeVideo].title}</h3>
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

          
          {/* 青黒グラデーション背景 */}
          <div 
            className="absolute inset-0 transition-all duration-500 ease-out"
            style={{ 
              background: `radial-gradient(circle at 70% 70%, rgba(59, 130, 246, ${Math.min(scrollY / 300, 0.8)}) 0%, rgba(59, 130, 246, 0) ${100 - Math.min(scrollY / 10, 70)}%)`,
              transform: `scale(${1 + Math.min(scrollY / 500, 0.5)})`,
              opacity: showRedGradient ? 0 : 1
            }}
          ></div>
          
          {/* 赤白グラデーション背景 */}
          <div 
            className="absolute inset-0 z-15 transition-all duration-1000 ease-out"
            style={{ 
              background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(239, 68, 68, 0.7) 70%)`,
              opacity: showRedGradient ? 1 : 0
            }}
          ></div>
          
          <div 
            className={`absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-700 via-red-500/50 to-red-500/0 transition-opacity duration-1000 ${
              showGradient ? 'opacity-100' : 'opacity-0'
            } z-20`}
            style={{ 
              opacity: Math.max(showGradient ? 1 - scrollY / 300 : 0, 0) * (showRedGradient ? 0 : 1)
            }}
          ></div>
          
          <div 
            className={`absolute bottom-24 left-12 z-30 text-white overflow-hidden transition-all duration-1000 ${
              showText ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
            style={{ 
              opacity: Math.max(showText ? 1 - scrollY / 150 : 0, 0),
              transform: `translateY(${Math.min(scrollY / 10, 50)}px)`
            }}
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
            <div className="flex justify-end items-center px-8 text-white py-7 backdrop-blur-lg">
              <div className="flex space-x-8">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="relative group overflow-hidden py-2 cursor-pointer"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-red-300 font-light tracking-widest text-base">HOME</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </button>
                <button 
                  onClick={() => scrollToSection('works')}
                  className="relative group overflow-hidden py-2 cursor-pointer"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-red-300 font-light tracking-widest text-base">WORKS</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="relative group overflow-hidden py-2 cursor-pointer"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-red-300 font-light tracking-widest text-base">CONTACT</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </button>
              </div>
            </div>
          </nav>
          


      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        .pulse-animation {
          animation: pulse 2s infinite ease-in-out;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes particle {
          0% { transform: translateY(0) scale(1); opacity: 0.5; }
          100% { transform: translateY(-20px) scale(0); opacity: 0; }
        }
        .particle-animation {
          animation: particle 3s infinite ease-out;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
      
      {/* スクロール用のダミー要素 */}
      <div style={{ height: '300vh' }} className="invisible"></div>
    </>
  );
};

// グローバルスタイルを追加
const GlobalStyles = () => {
  useEffect(() => {
    // スタイルを適用
    document.body.style.minHeight = '300vh';
    
    return () => {
      // クリーンアップ
      document.body.style.minHeight = '';
    };
  }, []);
  
  return null;
};

const MembersSectionWithStyles = () => (
  <>
    <GlobalStyles />
    <MembersSection />
  </>
);

export default MembersSectionWithStyles; 