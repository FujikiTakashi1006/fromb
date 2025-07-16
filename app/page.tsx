import HomeSection from './components/HomeSection';
import WorksSection from './components/WorksSection';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <div>
      <section id="home" className="min-h-screen">
        <HomeSection />
      </section>
      <section id="works" className="min-h-screen">
        <WorksSection />
      </section>
      <section id="contact" className="min-h-screen">
        <ContactSection />
      </section>
    </div>
  );
}