'use client';
import { motion } from 'framer-motion';
import {
  FaCode,
  FaServer,
  FaMobile,
  FaDatabase,
  FaCloud,
  FaTools,
} from 'react-icons/fa';

const services = [
  {
    title: 'Frontend Development',
    description:
      'Creating responsive and interactive user interfaces using modern frameworks like React and Next.js',
    icon: <FaCode className='text-4xl' />,
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
    gradient: 'from-purple-500/20 to-blue-500/20',
  },
  {
    title: 'Backend Development',
    description:
      'Building robust server-side applications and APIs with Node.js and .NET Core',
    icon: <FaServer className='text-4xl' />,
    technologies: ['Node.js', '.NET Core', 'Express', 'REST APIs'],
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'Mobile Development',
    description:
      'Developing cross-platform mobile applications using React Native',
    icon: <FaMobile className='text-4xl' />,
    technologies: ['React Native', 'Expo', 'Mobile UI/UX'],
    gradient: 'from-cyan-500/20 to-purple-500/20',
  },
  {
    title: 'Database Design',
    description: 'Designing and implementing efficient database solutions',
    icon: <FaDatabase className='text-4xl' />,
    technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    gradient: 'from-purple-500/20 to-cyan-500/20',
  },
  {
    title: 'Cloud Services',
    description: 'Deploying and managing applications on cloud platforms',
    icon: <FaCloud className='text-4xl' />,
    technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes'],
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    title: 'DevOps',
    description:
      'Implementing CI/CD pipelines and maintaining development infrastructure',
    icon: <FaTools className='text-4xl' />,
    technologies: ['Git', 'Jenkins', 'Docker', 'GitHub Actions'],
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
];

export default function Service() {
  return (
    <div
      id='service'
      className='min-h-screen bg-[#0F1624] relative overflow-hidden scroll-mt-16 
                 md:scroll-mt-20 pt-20 md:pt-24'
    >
      {/* Animated background elements */}
      <motion.div
        className='absolute top-20 right-0 sm:right-20 w-48 sm:w-96 h-32 sm:h-96 
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

      {/* Add a fade gradient at the top */}
      <div
        className='absolute top-0 left-0 right-0 h-24 bg-gradient-to-b 
                     from-[#0F1624] to-transparent z-20'
      />

      <div className='container mx-auto px-4 py-8 sm:py-16 relative z-20'>
        <div className='text-center mb-12 sm:mb-16'>
          <motion.div className='mb-6 sm:mb-8 relative inline-block'>
            <h1
              className='text-4xl sm:text-5xl md:text-6xl font-bold text-transparent 
                          bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 
                          to-cyan-500 mb-4'
            >
              My Services
            </h1>
            <motion.div
              className='absolute -right-4 -top-4 w-8 h-8 text-purple-500'
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✦
            </motion.div>
          </motion.div>
          <motion.p
            className='text-gray-400 text-lg max-w-2xl mx-auto'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            I offer a comprehensive range of development services to bring your
            digital ideas to life
          </motion.p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group backdrop-blur-md bg-white/5 border border-white/10 p-6 
                         rounded-xl hover:transform hover:scale-105 transition-all duration-300 
                         hover:bg-gradient-to-br ${service.gradient}`}
            >
              <div className='relative z-10'>
                <div
                  className='text-purple-500 group-hover:text-white mb-4 
                              transform group-hover:scale-110 transition-all duration-300'
                >
                  {service.icon}
                </div>
                <h3 className='text-xl sm:text-2xl font-bold text-white mb-3'>
                  {service.title}
                </h3>
                <p className='text-gray-400 text-sm sm:text-base mb-4'>
                  {service.description}
                </p>

                <div className='flex flex-wrap gap-2 mt-4'>
                  {service.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05 }}
                      className='px-3 py-1 text-xs sm:text-sm bg-[#0F1624]/50 
                               text-gray-300 rounded-full backdrop-blur-sm
                               border border-white/5 hover:border-purple-500/50
                               transition-colors duration-300'
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className='text-center mt-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a
            href='#contact'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='inline-block px-8 py-3 bg-gradient-to-r from-purple-500 
                      to-blue-500 text-white font-bold rounded-full
                      hover:shadow-lg hover:shadow-purple-500/25 
                      transition-all duration-300'
          >
            Let&apos;s Work Together
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
