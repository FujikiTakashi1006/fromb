'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Navigation from './Navigation';

export default function ContactSection() {
  const [showContent, setShowContent] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.currentTarget as HTMLFormElement;
    form.classList.add('fade-out-form');
    
    setTimeout(() => {
      setFormSubmitted(true);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <Navigation />
      
      <div 
        className={`relative z-10 pt-24 pb-12 transition-all duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex justify-center items-center min-h-[calc(100vh-6rem)]">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-2xl mx-8">
            <h1 className="text-2xl font-light text-white tracking-wider mb-6 text-center flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              CONTACT
            </h1>
            
            {formSubmitted ? (
              <div className="bg-white/20 rounded-lg p-6 text-center transition-all duration-500 animate-fade-in">
                <svg className="w-16 h-16 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <h2 className="text-xl font-medium text-white mb-2">お問い合わせありがとうございます</h2>
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
        
        <div className="bg-black/30 backdrop-blur-sm mt-12">
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
    </div>
  );
}