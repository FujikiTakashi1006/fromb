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
    category: 'CM',
    title: '企業プロモーション映像',
    description: '・企画から撮影・編集まで一貫して担当\n・SNS広告用に複数フォーマットで納品',
    mainImage: '/18.jpg',
    subImage: '/syugo.jpg',
    subImageAlt: '撮影風景'
  },
  {
    id: 3,
    category: 'ドキュメンタリー',
    title: 'ある日の記録',
    description: '・ディレクターとして参加\n・地域映像祭にて上映',
    mainImage: '/18.jpg',
    subImage: '/syugo.jpg',
    subImageAlt: '撮影チーム'
  },
  {
    id: 4,
    category: 'Web動画',
    title: 'ブランドストーリー',
    description: '・コンセプト設計から参加\n・YouTube公開後10万回再生達成',
    mainImage: '/18.jpg',
    subImage: '/syugo.jpg',
    subImageAlt: '編集作業'
  },
  {
    id: 5,
    category: 'イベント映像',
    title: 'ライブ収録',
    description: '・マルチカメラ収録・編集を担当\n・アーティスト公式チャンネルで公開',
    mainImage: '/18.jpg',
    subImage: '/syugo.jpg',
    subImageAlt: 'ライブ会場'
  }
];

export default function WorkSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);

  const displayedWorks = showAll ? works : works.slice(0, 3);

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
    <div className="pt-8 sm:pt-12 pb-16 sm:pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className={`flex items-center gap-6 mb-8 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Work
          </h2>
          <p className="text-gray-600 text-sm md:text-base">映像制作・プロデュース実績</p>
        </div>

        {/* Works Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {displayedWorks.map((work) => (
            <div
              key={work.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => setSelectedWork(work)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={work.mainImage}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded mb-2">
                  {work.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {work.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {works.length > 3 && (
          <div className={`text-center mt-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {showAll ? '閉じる' : 'もっと見る'}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedWork && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              {/* Close Button */}
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

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
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded">
                        {selectedWork.category}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                      {selectedWork.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {selectedWork.description}
                    </p>
                  </div>

                  {/* Sub Image */}
                  <div className="relative h-48 sm:h-56 rounded-lg overflow-hidden mt-6">
                    <Image
                      src={selectedWork.subImage}
                      alt={selectedWork.subImageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
