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
  },
  {
    title: 'Backend Development',
    description:
      'Building robust server-side applications and APIs with Node.js and .NET Core',
    icon: <FaServer className='text-4xl' />,
    technologies: ['Node.js', '.NET Core', 'Express', 'REST APIs'],
  },
  {
    title: 'Mobile Development',
    description:
      'Developing cross-platform mobile applications using React Native',
    icon: <FaMobile className='text-4xl' />,
    technologies: ['React Native', 'Expo', 'Mobile UI/UX'],
  },
  {
    title: 'Database Design',
    description: 'Designing and implementing efficient database solutions',
    icon: <FaDatabase className='text-4xl' />,
    technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  },
  {
    title: 'Cloud Services',
    description: 'Deploying and managing applications on cloud platforms',
    icon: <FaCloud className='text-4xl' />,
    technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes'],
  },
  {
    title: 'DevOps',
    description:
      'Implementing CI/CD pipelines and maintaining development infrastructure',
    icon: <FaTools className='text-4xl' />,
    technologies: ['Git', 'Jenkins', 'Docker', 'GitHub Actions'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Service() {
  return (
    <div id='service' className='min-h-screen bg-[#0F1624] py-20 scroll-mt-10'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <motion.h1
            className='text-4xl md:text-5xl font-bold text-white mb-6'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Services
          </motion.h1>
          <motion.p
            className='text-gray-400 text-lg max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I offer a comprehensive range of development services to bring your
            digital ideas to life
          </motion.p>
        </div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className='group relative bg-[#171F38] rounded-xl p-6 hover:bg-[#1A2332] transition-all duration-300
                        transform hover:-translate-y-2 hover:shadow-2xl'
            >
              {/* Service Card Content */}
              <div className='relative z-10'>
                <div className='text-[#FFD700] mb-4 transform group-hover:scale-110 transition-transform duration-300'>
                  {service.icon}
                </div>
                <h3 className='text-2xl font-bold text-white mb-3'>
                  {service.title}
                </h3>
                <p className='text-gray-400 mb-4'>{service.description}</p>

                {/* Technologies */}
                <div className='flex flex-wrap gap-2 mt-4'>
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className='px-3 py-1 text-sm bg-[#0F1624] text-gray-300 rounded-full
                               hover:bg-[#FFD700] hover:text-black transition-colors duration-300'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div
                className='absolute top-0 right-0 w-20 h-20 bg-[#FFD700] opacity-0 group-hover:opacity-5 
                            rounded-full blur-xl transition-opacity duration-300'
              ></div>
              <div
                className='absolute bottom-0 left-0 w-16 h-16 bg-[#FFD700] opacity-0 group-hover:opacity-5 
                            rounded-full blur-xl transition-opacity duration-300'
              ></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className='text-center mt-16'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <a
            href='#contact'
            className='inline-block px-8 py-3 bg-[#FFD700] text-black font-bold rounded-full
                     hover:bg-[#FFE55C] transform hover:-translate-y-1 transition-all duration-300
                     shadow-lg hover:shadow-xl'
          >
            Let&apos;s Work Together
          </a>
        </motion.div>
      </div>
    </div>
  );
}
