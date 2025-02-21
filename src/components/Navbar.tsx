'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Logo from './Logo';
import {
  FaHome,
  FaUser,
  FaCog,
  FaFolder,
  FaPhone,
  FaBlog,
  FaUserCircle,
} from 'react-icons/fa';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setActiveSection(sectionId);

    // Check if we're not on the home page
    if (pathname !== '/') {
      // Use Next.js router for client-side navigation
      await router.push('/');
      // Wait for a brief moment to ensure the page has loaded
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // If we're on home page, smooth scroll to section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      name: 'Blog',
      sectionId: 'blog',
      icon: <FaBlog className='text-2xl' />,
    },
    {
      name: 'Contact',
      sectionId: 'contact',
      icon: <FaPhone className='text-2xl' />,
    },
  ];

  const handleLoginClick = () => {
    router.push('/login');
  };

  // Remove the mobileNavItems array and use the existing navItems
  // Just modify the icons to be smaller for the bottom nav
  const mobileNavItems = navItems.map((item) => ({
    ...item,
    icon: <div className='text-xl'>{item.icon}</div>, // Make icons smaller for mobile
  }));

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

            <div className='hidden md:flex items-center space-x-8'>
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
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={handleLoginClick}
                className='cursor-pointer text-gray-300 hover:text-white'
              >
                <FaUserCircle className='text-2xl' />
              </motion.div>
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

      {/* Updated Mobile Bottom Navigation */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 bg-[#0F1624]/80 backdrop-blur-lg z-50'>
        <div className='grid grid-cols-4 items-center h-16 px-2'>
          {mobileNavItems.slice(0, 4).map((item) => (
            <motion.a
              key={item.name}
              href={`#${item.sectionId}`}
              onClick={(e) => scrollToSection(e, item.sectionId)}
              className='flex flex-col items-center justify-center space-y-1'
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`${
                  activeSection === item.sectionId
                    ? 'text-purple-500'
                    : 'text-gray-400'
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[10px] ${
                  activeSection === item.sectionId
                    ? 'text-purple-500'
                    : 'text-gray-400'
                }`}
              >
                {item.name}
              </span>
            </motion.a>
          ))}
        </div>
        {/* Add a safe area padding for iOS devices */}
        <div className='h-[env(safe-area-inset-bottom)] bg-[#0F1624]/80 backdrop-blur-lg' />
      </div>

      {/* Show remaining items in a "More" menu if needed */}
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
              className='fixed right-0 top-0 h-full w-[70%] bg-[#0F1624] z-50 md:hidden pb-20'
            >
              {/* Sidebar Header */}
              <div className='flex items-center justify-between px-2 py-2 border-b border-gray-700'>
                <div className='cursor-pointer'>
                  <Logo />
                </div>
                <motion.button
                  className='text-2xl text-white'
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  ✕
                </motion.button>
              </div>

              <div className='flex flex-col space-y-6 pt-6 px-6'>
                {navItems.slice(4).map(
                  (
                    item // Show remaining items
                  ) => (
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
                  )
                )}
                <a
                  onClick={handleLoginClick}
                  className='flex items-center space-x-4 text-gray-300 hover:text-white transition-colors cursor-pointer'
                >
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center space-x-4'
                  >
                    <div className='w-8'>
                      <FaUserCircle className='text-2xl' />
                    </div>
                    <span>Login</span>
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
