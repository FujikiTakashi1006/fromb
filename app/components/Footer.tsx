'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="fromB" className="h-8" />
              <span className="text-2xl font-bold ml-3">fromB</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Video creater VP・PV・MV制作
            </p>
            
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400 text-sm">mktr087@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-gray-400 text-sm">
                  <div className="mb-2">
                    <span className="block font-medium">福岡オフィス：</span>
                    <span className="block">〒810-0001 福岡県福岡市中央区天神４丁目４−２６</span>
                    <span className="block">天神吉柳ビル 7F</span>
                  </div>
                  <div>
                    <span className="block font-medium">東京オフィス：</span>
                    <span className="block">〒106-0044 東京都港区東麻布２丁目２２−７</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">サイトマップ</h4>
            <nav className="space-y-2">
              <button
                onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                ホーム
              </button>
              <button
                onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                作品
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                お問い合わせ
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 fromB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}