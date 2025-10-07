import HomeSection from './components/HomeSection';
import WorkSection from './components/WorkSection';
import WorksSection from './components/WorksSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div>
      <section id="home" className="min-h-screen">
        <HomeSection />
      </section>
      <section id="work" className="bg-gradient-to-br from-slate-100 to-gray-200">
        <WorkSection />
      </section>
      <section id="works" className="bg-gradient-to-br from-purple-300 via-blue-300 to-indigo-400">
        <WorksSection />
      </section>
      <section id="contact" className="min-h-screen">
        <ContactSection />
      </section>
      <Footer />
    </div>
  );
}