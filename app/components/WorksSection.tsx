'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

export default function WorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotice, setShowNotice] = useState(false);

  const works = useMemo(() => [
    {
      id: 'iuhFpC_Hd7s',
      title: 'noh/Reverberation',
      category: 'Music Video',
      description: 'Music Video',
      url: 'https://youtu.be/iuhFpC_Hd7s?si=pj7zrabZcEEM-O8d',
      year: '2024'
    },
    {
      id: 'OHKQ9qmgzMM',
      title: '空白の夜/純',
      category: 'Music Video',
      description: 'Music Video',
      url: 'https://youtu.be/OHKQ9qmgzMM?si=DdxEWvl-cCOE68nD',
      year: '2024'
    },
    {
      id: 'BKRR6jc1RGE',
      title: 'THE ENCORE/四度目の桜',
      category: 'Music Video',
      description: 'Music Video',
      url: 'https://youtu.be/BKRR6jc1RGE?si=MudoWNZ5wS55AFrx',
      year: '2023'
    },
    {
      id: 'd1_zrKLEhwQ',
      title: '駄洒落/夏の景',
      category: 'Music Video',
      description: 'Music Video',
      url: 'https://youtu.be/d1_zrKLEhwQ?si=4NPy7s_3doPvRRow',
      year: '2023'
    },
    {
      id: '27wp7YMh3og',
      title: '裏水/天使の疑問符',
      category: 'Music Video',
      description: 'Music Video',
      url: 'https://youtu.be/27wp7YMh3og?si=Vz8xZNZyfJ1eF6LP',
      year: '2023'
    }
  ], []);

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

    const element = document.getElementById('works');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Auto slide for slideshow every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % works.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [works.length, currentSlide]);


  return (
    <div className="py-16 sm:py-20 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Slideshow */}
        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 justify-center">
              {/* Title Section */}
              <div className="flex-shrink-0 text-center">
                <h2 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  Portfolio
                </h2>
                <p className="text-white/80 text-base md:text-xl max-w-3xl mx-auto">
                  私たちが手がけた様々なジャンルの映像作品
                </p>
                <div className="mt-3 relative">
                  <button
                    onClick={() => setShowNotice(!showNotice)}
                    className="text-white/60 text-sm hover:text-white/80 transition-colors duration-300 flex items-center gap-2 mx-auto"
                  >
                    ※ 関係者各位
                    <span className={`transition-transform duration-300 ${showNotice ? 'rotate-90' : ''}`}>
                      ▶
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 absolute z-20 top-8 left-0 bg-black/80 backdrop-blur-sm p-3 rounded-lg ${
                    showNotice ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-white/90 text-sm max-w-xs">
                      当Webサイトに掲載されている作品について、水﨑一輝の作例紹介を目的としております。<br />
                      ご不都合があればメールにてご連絡いただきますと幸いです。
                    </p>
                  </div>
                </div>
              </div>

              {/* Slideshow Section */}
              <div className="relative w-full max-w-md sm:max-w-lg lg:w-[600px]">
              <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] overflow-hidden">
                {works.map((work, index) => (
                  <div
                    key={`slide-${index}`}
                    className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                      index === currentSlide
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                    }`}
                    style={{
                      zIndex: index === currentSlide ? 10 : 1
                    }}
                  >
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group"
                         onClick={() => window.open(work.url, '_blank')}>
                      {/* Image with padding */}
                      <div className="sm:p-4">
                        <div className="relative h-52 sm:h-60 lg:h-72 rounded-2xl overflow-hidden">
                          <Image
                            src={`https://img.youtube.com/vi/${work.id}/maxresdefault.jpg`}
                            alt={work.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />

                          {/* Hover Play Button */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                            <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                              <svg className="w-6 h-6 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 text-sm font-medium rounded-full">
                            {work.category}
                          </span>
                          <span className="text-sm text-gray-500">{work.year}</span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {work.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Cards - Full Width */}
      <div className={`-mt-16 transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="overflow-hidden py-4">
          <div
            className="flex space-x-6 animate-scroll"
            style={{
              width: `${works.length * 2 * 280}px`
            }}
          >
            {[...works, ...works].map((work, index) => {
              const workIndex = index % works.length;
              return (
              <div
                key={`card-${index}`}
                className="flex-shrink-0 w-48 sm:w-64 group cursor-pointer"
                onClick={() => setCurrentSlide(workIndex)}
              >
                <div
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{
                    transform: `rotate(${(workIndex % 3 - 1) * 3}deg)`
                  }}
                >
                  {/* Image with padding */}
                  <div className="p-4">
                    <div className="relative h-32 sm:h-40 rounded-2xl overflow-hidden">
                      <Image
                        src={`https://img.youtube.com/vi/${work.id}/maxresdefault.jpg`}
                        alt={work.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 text-xs font-medium rounded-full">
                        {work.category}
                      </span>
                      <span className="text-xs text-gray-500">{work.year}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {work.title}
                    </h3>

                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
