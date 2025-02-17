import About from './about/page';
import ClientHero from './components/ClientHero';
import Service from './service/page';
import Projects from './projects/page';
import Blog from './blog/page';
import Contact from './contact/page';

export default function Home() {
  return (
    <main>
      <ClientHero />
      <About />
      <Service />
      <Projects />
      <Blog />
      <Contact />
    </main>
  );
}
