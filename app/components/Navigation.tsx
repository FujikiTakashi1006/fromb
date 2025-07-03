'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/works', label: 'WORKS' },
    { href: '/contact', label: 'CONTACT' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md animate-fadeIn">
      <div className="flex justify-end items-center px-8 text-white py-7">
        <div className="flex space-x-8">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative group overflow-hidden py-2 cursor-pointer ${
                isActive(href) ? 'text-red-300' : ''
              }`}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-red-300 font-light tracking-widest text-base">
                {label}
              </span>
              <span 
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-400 transform origin-left transition-transform duration-300 ${
                  isActive(href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              ></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}