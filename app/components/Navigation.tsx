'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'ホーム' },
    { id: 'works', label: '作品' },
    { id: 'contact', label: 'お問い合わせ' },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 80; // ナビゲーションの高さ
      const sectionTop = section.offsetTop - navHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      const sections = navItems.map(item => item.id);
      let currentSection = 'home';

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (id: string) => activeSection === id;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white/10 backdrop-blur-md'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-1"
          >
            <div className="relative w-12 h-12">
              <Image
                src="/logo-only.png"
                alt="fromB Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}>
              fromB
            </span>
          </button>
          
          {/* Navigation Items */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative py-2 px-4 rounded-full transition-all duration-300 ${
                  isActive(id) 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : scrolled 
                      ? 'text-gray-700 hover:text-blue-600' 
                      : 'text-white hover:text-blue-200'
                }`}
              >
                <span className="font-medium text-sm">
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile menu clicked, current state:', mobileMenuOpen);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
              style={{ pointerEvents: 'auto' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`backdrop-blur-sm ${
          scrolled ? 'bg-white/90' : 'bg-white/10'
        }`}>
          <div className="px-6 py-6 space-y-4">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  scrollToSection(id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-3 px-4 rounded-xl transition-all duration-300 ${
                  isActive(id) 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105' 
                    : scrolled 
                      ? 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                      : 'text-white/90 hover:bg-white/10 hover:text-white hover:scale-105'
                }`}
              >
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}