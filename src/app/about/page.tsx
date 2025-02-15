'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
      className='min-h-screen bg-[#0F1624] relative overflow-hidden scroll-mt-20 md:scroll-mt-24 px-4 sm:px-6'
    >
      {/* Animated background elements - adjusted for mobile */}
      <motion.div
        className='absolute top-0 right-0 sm:right-20 w-48 sm:w-96 h-32 sm:h-96 
                   bg-purple-500/10 rounded-full blur-3xl z-10'
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className='absolute bottom-20 left-0 sm:left-20 w-48 sm:w-96 h-48 sm:h-96 
                   bg-blue-500/10 rounded-full blur-3xl'
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [180, 0, 180],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className='container mx-auto py-16 sm:py-24 relative z-20'>
        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='max-w-4xl mx-auto mb-8 sm:mb-16 text-center pt-8'
        >
          <motion.div className='mb-6 sm:mb-8 relative inline-block'>
            <h1
              className='text-3xl sm:text-4xl md:text-5xl font-bold text-transparent 
                          bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 
                          to-cyan-500 mb-4'
            >
              About Me
            </h1>
            <motion.div
              className='absolute -right-2 sm:-right-4 -top-2 sm:-top-4 w-6 sm:w-8 
                        h-6 sm:h-8 text-purple-500'
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✦
            </motion.div>
          </motion.div>
          <p className='text-base sm:text-lg text-gray-300 px-4 sm:px-6'>
            I&apos;m Ajmal Hussain, a Full Stack Developer with 2 years of
            experience in Javascript & React. I blend creativity with
            functionality to craft engaging designs. Choosing me means
            transforming ideas into results. Let&apos;s collaborate to enhance
            your digital presence.
          </p>
        </motion.div>

        {/* What I'm Doing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mb-8 sm:mb-16'
        >
          <h2 className='text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center'>
            What I&apos;m Doing
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto'>
            {[
              {
                title: 'Mobile Apps',
                description:
                  'Professional development of applications for Android and iOS.',
                icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
              },
              {
                title: 'Web Development',
                description:
                  'High-quality development of sites at the professional level.',
                icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
              },
              {
                title: 'UI/UX Design',
                description:
                  'The most modern and high-quality design made at a professional level.',
                icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
              },
              {
                title: 'Backend Development',
                description:
                  'High-performance backend services designed for scalability.',
                icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='group backdrop-blur-md bg-white/5 border border-white/10 
                          p-4 sm:p-6 rounded-xl hover:transform hover:scale-105 
                          transition-all duration-300 hover:bg-gradient-to-br 
                          hover:from-purple-500/20 hover:to-blue-500/20'
              >
                <div className='flex items-center mb-3 sm:mb-4'>
                  <div
                    className='w-10 sm:w-12 h-10 sm:h-12 mr-3 sm:mr-4 
                                text-purple-500 group-hover:text-white 
                                transition-colors duration-300'
                  >
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
                        d={service.icon}
                      />
                    </svg>
                  </div>
                  <h3 className='text-lg sm:text-xl font-bold text-white'>
                    {service.title}
                  </h3>
                </div>
                <p className='text-sm sm:text-base text-gray-300'>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mt-8 sm:mt-16'
        >
          <h2 className='text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center'>
            Skills
          </h2>
          <div className='relative max-w-6xl mx-auto'>
            {/* Gradient overlays */}
            <div
              className='absolute left-0 top-0 bottom-0 w-12 sm:w-20 
                          bg-gradient-to-r from-[#0F1624] to-transparent z-10'
            ></div>
            <div
              className='absolute right-0 top-0 bottom-0 w-12 sm:w-20 
                          bg-gradient-to-l from-[#0F1624] to-transparent z-10'
            ></div>

            {/* Scrolling container */}
            <div
              ref={scrollContainerRef}
              className='overflow-x-auto hide-scrollbar'
            >
              <div className='flex gap-3 sm:gap-6 py-4 px-12 sm:px-20 min-w-max'>
                {[...skills, ...skills].map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    }}
                    className='flex flex-col items-center bg-white/5 p-3 sm:p-6 
                             rounded-xl hover:bg-white/10 transition-all duration-300 
                             w-24 sm:w-32 backdrop-blur-sm border border-white/10
                             hover:transform hover:scale-105'
                  >
                    <div className='w-12 sm:w-16 h-12 sm:h-16 mb-2 sm:mb-4 relative group'>
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={64}
                        height={64}
                        className='w-full h-full object-contain transition-transform 
                                 duration-300 group-hover:transform group-hover:scale-110'
                      />
                    </div>
                    <span className='text-white text-xs sm:text-sm font-medium text-center'>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
