import About from './about/page';
import Hero from './components/Hero';
import Service from './service/page';
import Projects from './projects/page';
import Blog from './blog/page';
import Contact from './contact/page';
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
