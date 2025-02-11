'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { FaHome, FaUser, FaCog, FaFolder, FaPhone } from 'react-icons/fa';

const Navbar = () => {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const throttle = <T extends (...args: unknown[]) => void>(
    func: T,
    limit: number
  ): T => {
    let inThrottle: boolean;
    return ((...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    }) as T;
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 20);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Home', sectionId: 'home', icon: <FaHome className='text-2xl' /> },
    {
      name: 'About',
      sectionId: 'about',
      icon: <FaUser className='text-2xl' />,
    },
    {
      name: 'Service',
      sectionId: 'service',
      icon: <FaCog className='text-2xl' />,
    },
    {
      name: 'Projects',
      sectionId: 'projects',
      icon: <FaFolder className='text-2xl' />,
    },
    {
      name: 'Contact',
      sectionId: 'contact',
      icon: <FaPhone className='text-2xl' />,
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0F1624]/80 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between'>
            <div className='cursor-pointer'>
              <a
                href='#home'
                onClick={(e) => scrollToSection(e, 'home')}
                className='block'
              >
                <Logo />
              </a>
            </div>

            <div className='hidden md:flex space-x-8'>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.sectionId}`}
                  onClick={(e) => scrollToSection(e, item.sectionId)}
                  className={`text-gray-300 hover:text-white transition-colors ${
                    pathname === `/${item.sectionId}`
                      ? 'text-white font-semibold'
                      : ''
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className='inline-block'
                  >
                    {item.name}
                  </motion.div>
                </a>
              ))}
            </div>

            <motion.button
              className='md:hidden text-2xl'
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarOpen(true)}
            >
              ☰
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className='fixed inset-0 bg-black/50 z-50 md:hidden'
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className='fixed right-0 top-0 h-full w-72 bg-[#0F1624] z-50 md:hidden'
            >
              <motion.button
                className='absolute top-4 right-4 text-2xl text-white'
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSidebarOpen(false)}
              >
                ✕
              </motion.button>

              <div className='flex flex-col space-y-6 pt-16 px-6'>
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={`#${item.sectionId}`}
                    onClick={(e) => {
                      scrollToSection(e, item.sectionId);
                      setIsSidebarOpen(false);
                    }}
                    className={`flex items-center space-x-4 text-gray-300 hover:text-white transition-colors ${
                      pathname === `/${item.sectionId}`
                        ? 'text-white font-semibold'
                        : ''
                    }`}
                  >
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className='flex items-center space-x-4'
                    >
                      <div className='w-8'>{item.icon}</div>
                      <span>{item.name}</span>
                    </motion.div>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
