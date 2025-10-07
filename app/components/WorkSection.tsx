'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function WorkSection() {
  const [isVisible, setIsVisible] = useState(false);

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
          <h2 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Work
          </h2>
          <p className="text-gray-600 text-sm md:text-base">映像制作・プロデュース実績</p>
        </div>

        {/* Work Item */}
        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Left: Main Image */}
              <div>
                <div className="relative h-80 sm:h-96 lg:h-[500px] overflow-hidden">
                  <Image
                    src="/18.jpg"
                    alt="18になった君へ"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right: Content and Team Photo */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded">
                      短編映画
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      18になった君へ
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    ・制作プロデューサーとして参加<br />
                    ・つんく♂氏が総指揮を務める「TOKYO青春映画祭2025」にてノミネート
                  </p>
                </div>

                {/* Team Photo */}
                <div className="relative h-64 sm:h-72 lg:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/syugo.jpg"
                    alt="制作チーム集合写真"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
