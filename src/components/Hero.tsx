'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaRocket, FaCode, FaMagic, FaCube } from 'react-icons/fa';
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
} from 'react-icons/si';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeIcon, setActiveIcon] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window !== 'undefined') {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  if (!isMounted) {
    return null; // or a loading state
  }

  const floatingIcons = [
    { icon: <FaRocket className='text-3xl' />, color: 'purple' },
    { icon: <FaCode className='text-3xl' />, color: 'blue' },
    { icon: <FaMagic className='text-3xl' />, color: 'pink' },
    { icon: <FaCube className='text-3xl' />, color: 'cyan' },
  ];

  const techSkills = [
    { icon: <SiReact />, name: 'React', color: '#61DAFB' },
    { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6' },
    { icon: <SiNextdotjs />, name: 'Next.js', color: '#ffffff' },
    { icon: <SiTailwindcss />, name: 'Tailwind', color: '#06B6D4' },
    { icon: <SiJavascript />, name: 'JavaScript', color: '#F7DF1E' },
    { icon: <SiNodedotjs />, name: 'Node.js', color: '#339933' },
    { icon: <SiGit />, name: 'Git', color: '#F05032' },
    { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248' },
  ];

  const scrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id='home'
      className='min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0F1624] px-4 sm:px-6'
    >
      {/* Interactive Background */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1624]/50' />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-white/20 rounded-full'
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: mousePosition.x * 20 + Math.random() * window.innerWidth,
              y: mousePosition.y * 20 + Math.random() * window.innerHeight,
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Floating Interactive Icons */}
      <div className='absolute inset-0 pointer-events-none'>
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${
              activeIcon === index
                ? 'text-' + item.color + '-500'
                : 'text-white/50'
            } cursor-pointer pointer-events-auto`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              rotate: [0, 360],
              scale: activeIcon === index ? 1.5 : 1,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            onHoverStart={() => setActiveIcon(index)}
            onHoverEnd={() => setActiveIcon(null)}
            whileHover={{ scale: 1.5 }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className='container mx-auto z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center max-w-4xl mx-auto'
        >
          {/* Enhanced Animated Title */}
          <motion.div className='mb-8 relative space-y-2 sm:space-y-4'>
            <motion.h1
              className='text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                className='inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300'
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                Creative
              </motion.span>{' '}
              <br className='sm:hidden' />
              <motion.div
                className='relative inline-block'
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.2,
                }}
              >
                <span className='relative inline-block bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-transparent bg-clip-text'>
                  Playground
                </span>
                {/* Decorative elements */}
                <motion.div
                  className='absolute -right-4 -top-4 w-8 h-8 text-purple-500'
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  ✦
                </motion.div>
                <motion.div
                  className='absolute -left-3 -bottom-3 w-6 h-6 text-blue-500'
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  ⚡
                </motion.div>
              </motion.div>
            </motion.h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className='text-lg sm:text-xl text-gray-400 mb-12 px-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Where imagination meets technology
          </motion.p>

          {/* Tech Skills Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className='mt-12 sm:mt-16 mb-12'
          >
            <motion.p
              className='text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Tech Stack
            </motion.p>
            <div className='flex flex-wrap justify-center gap-4 sm:gap-6 px-2 sm:px-4'>
              {techSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1 * index,
                  }}
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 },
                  }}
                  className='group relative'
                >
                  <div
                    className='text-2xl sm:text-3xl p-2 sm:p-3 bg-[#1A2233] rounded-xl 
                             hover:bg-[#232B3B] transition-colors duration-300'
                    style={{ color: skill.color }}
                  >
                    {skill.icon}
                  </div>
                  {/* Tooltip */}
                  <div
                    className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                  >
                    <div
                      className='bg-[#1A2233] text-white text-xs sm:text-sm py-1 px-2 
                                  rounded whitespace-nowrap'
                    >
                      {skill.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Button */}
          <motion.button
            onClick={scrollToProjects}
            className='group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent 
                     overflow-hidden rounded-full text-base sm:text-lg'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 
                       to-cyan-500 rounded-full'
            />
            <span className='relative z-10 font-semibold'>View Projects</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
