'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const works = [
  {
    id: 1,
    category: '短編映画',
    title: '18になった君へ',
    description: '・制作プロデューサーとして参加\n・つんく♂氏が総指揮を務める「TOKYO青春映画祭2025」にてノミネート',
    mainImage: '/18.jpg',
    subImage: '/syugo.jpg',
    subImageAlt: '制作チーム集合写真'
  },
  {
    id: 2,
    category: 'ショートドラマ',
    title: '株式会社ホワイトナイト様',
    description: '・企業TikTokアカウント向けショートドラマ制作\n・企画・脚本・撮影・編集まで一貫して担当\n・SNSでの認知拡大に貢献',
    mainImage: '/saku-logo.png',
    url: 'https://www.tiktok.com/@taisyokudaikousakutto'
  }
];

export default function WorkSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);

  const displayedWorks = showAll ? works : works.slice(0, 3);

  const openModal = (work: typeof works[0]) => {
    setSelectedWork(work);
    setIsClosing(false);
    setIsOpening(true);
    // 次のフレームでアニメーション開始
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpening(false);
      });
    });
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedWork(null);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('work');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div className="pt-8 sm:pt-12 pb-16 sm:pb-20 bg-gradient-to-br from-slate-100 to-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-start md:justify-between mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Work
            </h2>
            <p className="text-gray-600 text-sm md:text-base">映像制作・プロデュース実績</p>
          </div>

          {works.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-4 md:mt-0 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <span className="text-sm font-medium">{showAll ? 'CLOSE' : 'VIEW ALL WORKS'}</span>
              <span className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center group-hover:border-blue-600 transition-colors">
                <svg className={`w-4 h-4 transition-transform ${showAll ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          )}
        </div>

        {/* Works Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {displayedWorks.map((work) => (
            <div
              key={work.id}
              className="cursor-pointer group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              onClick={() => openModal(work)}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={work.mainImage}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3 whitespace-pre-line">
                  {work.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 font-medium">{work.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-xs text-gray-500">{work.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedWork && (
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            isClosing || isOpening ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] relative transition-all duration-300 ${
              isClosing || isOpening ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - outside scrollable area */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6 sm:p-8 pt-16 overflow-y-auto max-h-[90vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Main Image */}
                <div className="relative h-64 sm:h-80 lg:h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src={selectedWork.mainImage}
                    alt={selectedWork.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Right: Content */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span className="text-sm text-gray-500">{selectedWork.category}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                      {selectedWork.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-4">
                      {selectedWork.description}
                    </p>
                    {'url' in selectedWork && selectedWork.url && (
                      <a
                        href={selectedWork.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                        </svg>
                        TikTokで見る
                      </a>
                    )}
                  </div>

                  {/* Sub Image */}
                  {'subImage' in selectedWork && selectedWork.subImage && (
                    <div className="relative h-48 sm:h-56 rounded-lg overflow-hidden mt-6">
                      <Image
                        src={selectedWork.subImage}
                        alt={'subImageAlt' in selectedWork ? selectedWork.subImageAlt as string : ''}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
