import dynamic from 'next/dynamic';
import About from './about/page';
import Service from './service/page';
import Projects from './projects/page';
import Blog from './blog/page';
import Contact from './contact/page';

// Dynamically import Hero with no SSR
const Hero = dynamic(() => import('./components/Hero'), { ssr: false });

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Service />
      <Projects />
      <Blog />
      <Contact />
    </main>
  );
}
