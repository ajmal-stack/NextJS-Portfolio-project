'use client';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section
      id='home'
      className='min-h-screen flex items-center justify-center relative overflow-hidden'
    >
      {/* Background animation */}
      <motion.div
        className='absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl'
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className='container mx-auto px-4 z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center'
        >
          <motion.h1
            className='text-5xl md:text-7xl font-bold mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Creative
            <span className='text-purple-500'> Developer</span>
          </motion.h1>
          <motion.p
            className='text-xl text-gray-400 mb-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Crafting digital experiences with modern technologies
          </motion.p>
          <motion.button
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              projectsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className='bg-purple-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-600 transition-colors'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
