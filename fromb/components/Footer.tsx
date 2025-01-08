import { Instagram, Youtube } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 absolute bottom-0 left-0 right-0"> {/* Update 1: Changed background and text color */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-white">fromB</h2> {/* Update 1: Adjusted text color for h2 */}
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-white hover:text-[#FFA500] transition-colors">
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-white hover:text-[#FF0000] transition-colors">
              <Youtube size={24} />
              <span className="sr-only">YouTube</span>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-300"> {/* Update 2: Adjusted text color for p tags */}
          <p>&copy; {currentYear} fromB. All rights reserved.</p>
          <p className="mt-1">TEL: 090-9408-8536 | Email: mktr087@gmail.com</p>
        </div>
      </div>
    </footer>
  )
}

