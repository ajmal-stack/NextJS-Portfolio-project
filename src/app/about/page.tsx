'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function About() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      if (scrollContainer) {
        scrollPosition += 0.8; // Adjust speed by changing this value

        // Reset scroll position when reaching the end
        if (
          scrollPosition >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
        animationFrameId = requestAnimationFrame(scroll);
      }
    };

    // Start scrolling animation
    animationFrameId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    scrollContainer?.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer?.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer?.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const skills = [
    { name: 'React', icon: '/img/icons/react.png' },
    { name: 'Next.js', icon: '/img/icons/nextjs.svg' },
    { name: 'JavaScript', icon: '/img/icons/javascript.ico' },
    { name: 'Node.js', icon: '/img/icons/nodejs.png' },
    { name: 'TypeScript', icon: '/img/icons/typeScript.svg' },
    { name: '.NET Core', icon: '/img/icons/dotnetcore.png' },
    { name: 'HTML5', icon: '/img/icons/html5-2.svg' },
    { name: 'CSS3', icon: '/img/icons/css-3-.svg' },
    { name: 'TailwindCSS', icon: '/img/icons/tailwindcss.svg' },
    { name: 'Git', icon: '/img/icons/git-icon-logo.svg' },
    { name: 'MongoDB', icon: '/img/icons/mongodb.svg' },
    { name: 'PostgreSQL', icon: '/img/icons/postgresql.svg' },
    { name: 'Docker', icon: '/img/icons/docker.svg' },
    // Add more skills as needed
  ];

  return (
    <div
      id='about'
      className='min-h-[70vh] bg-[#0F1624] flex items-center scroll-mt-10'
    >
      <div className='container mx-auto px-4 py-16'>
        {/* Introduction Section */}
        <div className='max-w-4xl mx-auto mb-16'>
          <h1 className='text-4xl font-bold text-white mb-4 text-center'>
            About Me
          </h1>
          <p className='text-lg text-gray-300 mb-6 text-center'>
            I&apos;m Ajmal Hussain, a Full Stack Developer with 2 years of
            experience in Javascript & React. I blend creativity with
            functionality to craft engaging designs. Choosing me means
            transforming ideas into results. Let&apos;s collaborate to enhance
            your digital presence. Reach me at my email to discuss your project.
          </p>
        </div>

        {/* What I'm Doing Section */}
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-white mb-8 text-center'>
            What I&apos;m Doing
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
            {/* Mobile Apps Card */}
            <div className='group backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-lg hover:transform hover:scale-105 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.24)]'>
              <div className='flex items-center mb-4'>
                <div className='w-12 h-12 mr-4 text-[#FFD700] group-hover:scale-110 transition-transform duration-300'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-white'>Mobile Apps</h3>
              </div>
              <p className='text-gray-300'>
                Professional development of applications for Android and iOS.
              </p>
            </div>

            {/* Web Development Card */}
            <div className='group backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-lg hover:transform hover:scale-105 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.24)]'>
              <div className='flex items-center mb-4'>
                <div className='w-12 h-12 mr-4 text-[#FFD700] group-hover:scale-110 transition-transform duration-300'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-white'>
                  Web Development
                </h3>
              </div>
              <p className='text-gray-300'>
                High-quality development of sites at the professional level.
              </p>
            </div>

            {/* UI/UX Design Card */}
            <div className='group backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-lg hover:transform hover:scale-105 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.24)]'>
              <div className='flex items-center mb-4'>
                <div className='w-12 h-12 mr-4 text-[#FFD700] group-hover:scale-110 transition-transform duration-300'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-white'>UI/UX Design</h3>
              </div>
              <p className='text-gray-300'>
                The most modern and high-quality design made at a professional
                level.
              </p>
            </div>

            {/* Backend Development Card */}
            <div className='group backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-lg hover:transform hover:scale-105 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.24)]'>
              <div className='flex items-center mb-4'>
                <div className='w-12 h-12 mr-4 text-[#FFD700] group-hover:scale-110 transition-transform duration-300'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-white'>
                  Backend Development
                </h3>
              </div>
              <p className='text-gray-300'>
                High-performance backend services designed for scalability and
                seamless user experience.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h2 className='text-3xl font-bold text-white mb-8 text-center'>
            Skills
          </h2>
          <div className='relative max-w-6xl mx-auto'>
            {/* Gradient Overlays */}
            <div className='absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0F1624] to-transparent z-10'></div>
            <div className='absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0F1624] to-transparent z-10'></div>

            {/* Scrolling Container */}
            <div
              ref={scrollContainerRef}
              className='overflow-x-auto hide-scrollbar'
            >
              <div className='flex gap-6 py-4 px-20 min-w-max'>
                {/* First set of skills */}
                {skills.map((skill, index) => (
                  <div
                    key={`first-${index}`}
                    className='flex flex-col items-center bg-[#171F38] p-6 rounded-lg hover:transform hover:scale-105 transition-all duration-300 w-32'
                  >
                    <div className='w-16 h-16 mb-4'>
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={64}
                        height={64}
                        className='w-full h-full object-contain'
                      />
                    </div>
                    <span className='text-white text-sm font-medium'>
                      {skill.name}
                    </span>
                  </div>
                ))}
                {/* Duplicate skills for seamless scrolling */}
                {skills.map((skill, index) => (
                  <div
                    key={`second-${index}`}
                    className='flex flex-col items-center bg-[#171F38] p-6 rounded-lg hover:transform hover:scale-105 transition-all duration-300 w-32'
                  >
                    <div className='w-16 h-16 mb-4'>
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={64}
                        height={64}
                        className='w-full h-full object-contain'
                      />
                    </div>
                    <span className='text-white text-sm font-medium'>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
