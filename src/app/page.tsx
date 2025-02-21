import About from '../components/About';
import ClientHero from '../components/ClientHero';
import Service from '../components/Service';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <ClientHero />
      <About />
      <Service />
      <Projects />
      <Blog />
      <Contact />
    </>
  );
}
