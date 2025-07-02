'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useVideoSlider } from '../hooks/useVideoSlider';
import { Video } from '../types';

const MembersSection = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const {
    scrollY,
    showGradient,
    showMenu,
    showText,
    showRedGradient,
    showWorksTitle,
    showWorksContent,
    showContact,
    scrollToSection,
  } = useScrollAnimation();
  
  // フォーム送信された状態のリセット
  useEffect(() => {
    if (!showContact) {
      setFormSubmitted(false);
    }
  }, [showContact]);

  // スライドショーのデータ
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

  // CONTACTセクション内のフォーム送信ハンドラ
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.currentTarget as HTMLFormElement;
    form.classList.add('fade-out-form');
    
    setTimeout(() => {
      setFormSubmitted(true);
    }, 500);
  }, []);

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
              opacity: Math.min(Math.max((scrollY - 800) / 150, 0), 1) * Math.max(1 - ((scrollY - 1300) / 100), 0),
              visibility: scrollY > 1400 ? 'hidden' : 'visible'
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
              opacity: 1
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
          
          {/* CONTACTセクション */}
          <div 
            className="absolute inset-0 z-30 flex flex-col items-start pt-24 pl-20"
            style={{ 
              opacity: Math.min(Math.max((scrollY - 1500) / 100, 0), 1) * Math.max(1 - ((scrollY - 2000) / 200), 0),
              transition: 'opacity 0.5s ease-out',
              visibility: scrollY > 1400 && scrollY < 2200 ? 'visible' : 'hidden',
              transform: `translateY(${Math.min(Math.max((scrollY - 1500) / 5, 0), 20)}px)`
            }}
          >
            <div className="flex justify-center items-center w-full max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl w-full">
                <h3 className="text-2xl font-light text-white tracking-wider mb-6 text-center flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  CONTACT
                </h3>
                
                {formSubmitted ? (
                  <div className="bg-white/20 rounded-lg p-6 text-center transition-all duration-500 animate-fade-in">
                    <svg className="w-16 h-16 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <h4 className="text-xl font-medium text-white mb-2">お問い合わせありがとうございます</h4>
                    <p className="text-white/80">3営業日程で返信させていただきます。</p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="mt-6 text-sm text-white/70 hover:text-white underline transition-colors"
                    >
                      フォームに戻る
                    </button>
                  </div>
                ) : (
                  <form className="space-y-5 transition-all duration-500" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-white mb-2 text-sm">お名前</label>
                      <input 
                        type="text" 
                        placeholder="山田 太郎" 
                        className="w-full bg-white/30 border border-white/30 rounded-md px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 text-sm">メールアドレス</label>
                      <input 
                        type="email" 
                        placeholder="example@email.com" 
                        className="w-full bg-white/30 border border-white/30 rounded-md px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 text-sm">お問い合わせ内容</label>
                      <textarea 
                        placeholder="ご質問やご依頼内容をご記入ください" 
                        rows={5}
                        className="w-full bg-white/30 border border-white/30 rounded-md px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                        required
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-white text-gray-800 py-3 rounded-md hover:bg-white/90 transition-colors duration-300 font-medium tracking-wider"
                    >
                      送信する
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          
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
            <div className="flex justify-end items-center px-8 text-white py-7">
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
          
          {/* フッターセクション */}
          <div 
            className="absolute bottom-0 left-0 w-full z-40 bg-black/30 backdrop-blur-sm"
            style={{ 
              opacity: showContact ? 1 : 0,
              transition: 'opacity 1s ease-out',
              transitionDelay: '0.5s'
            }}
          >
            <div className="container mx-auto py-6 px-8 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Image src="/logo-only.png" alt="ロゴ" width={40} height={40} className="mr-4" />
                <div className="text-white text-sm">
                  <p className="font-light">© 2025 fromB</p>
                  <p className="text-xs opacity-70">All Rights Reserved.</p>
                </div>
              </div>
              
              <div className="flex space-x-6">
                <a href="#" className="text-white hover:text-red-300 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-red-300 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
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
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        @keyframes fade-out-form {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
        .fade-out-form {
          animation: fade-out-form 0.5s ease-out forwards;
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