'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';

export default function WorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState(0);

  const works = useMemo(() => [
    {
      id: 'iuhFpC_Hd7s',
      title: 'Brand Commercial',
      category: 'Commercial',
      description: '独自の視点で捉えた日常の美しさを表現した作品。光と影の対比が印象的な映像詩です。',
      url: 'https://youtu.be/iuhFpC_Hd7s?si=pj7zrabZcEEM-O8d',
      year: '2024'
    },
    {
      id: 'OHKQ9qmgzMM',
      title: 'Urban Symphony',
      category: 'Artistic',
      description: '都市の喧騒と静寂を対比させた実験的映像作品。現代社会の矛盾を鋭く切り取ります。',
      url: 'https://youtu.be/OHKQ9qmgzMM?si=DdxEWvl-cCOE68nD',
      year: '2024'
    },
    {
      id: 'BKRR6jc1RGE',
      title: 'Nature Documentary',
      category: 'Documentary',
      description: '自然と人間の共生をテーマにした叙情的な映像。心に響く音楽とともに贈る感動作。',
      url: 'https://youtu.be/BKRR6jc1RGE?si=MudoWNZ5wS55AFrx',
      year: '2023'
    },
    {
      id: 'd1_zrKLEhwQ',
      title: 'Experimental Film',
      category: 'Experimental',
      description: '革新的な撮影技法を駆使した前衛的作品。見る者の想像力を刺激する映像体験。',
      url: 'https://youtu.be/d1_zrKLEhwQ?si=4NPy7s_3doPvRRow',
      year: '2023'
    },
    {
      id: '27wp7YMh3og',
      title: 'Lifestyle Video',
      category: 'Lifestyle',
      description: '日常の一瞬を切り取った詩的な映像集。何気ない瞬間に宿る美しさを再発見させてくれます。',
      url: 'https://youtu.be/27wp7YMh3og?si=Vz8xZNZyfJ1eF6LP',
      year: '2023'
    },
    {
      id: 'placeholder1',
      title: 'Music Video',
      category: 'Music',
      description: 'アーティストの世界観を映像で表現したミュージックビデオ。音楽と映像の完璧な融合。',
      url: '#',
      year: '2024'
    }
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            作品
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-4">
              Portfolio
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            私たちが手がけた様々なジャンルの映像作品をご覧ください。
            ブランドムービーからアート作品まで、幅広い表現を追求しています。
          </p>
        </div>

        {/* Works Grid */}
        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, index) => (
              <div
                key={work.id}
                className="group cursor-pointer"
                onClick={() => setSelectedWork(index)}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-200 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  {work.id !== 'placeholder1' ? (
                    <Image
                      src={`https://img.youtube.com/vi/${work.id}/maxresdefault.jpg`}
                      alt={work.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <span className="text-gray-600 text-lg">Coming Soon</span>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                          {work.category}
                        </span>
                        <span className="text-white/80 text-sm">{work.year}</span>
                      </div>
                      <h3 className="text-white text-xl font-bold mb-2">{work.title}</h3>
                      <p className="text-white/90 text-sm line-clamp-2">{work.description}</p>
                    </div>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Work Info */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium">{work.category}</span>
                    <span className="text-sm text-gray-500">{work.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{work.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{work.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-lg text-gray-600 mb-8">
            あなたのプロジェクトも一緒に作りませんか？
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            お問い合わせする
          </button>
        </div>
      </div>
    </div>
  );
}