'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

// Project type definition
interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  images: string[];
  githubLink?: string;
  liveLink?: string;
  category: 'frontend' | 'fullstack' | 'mobile';
}

// Sample projects data
const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    shortDescription: 'A modern e-commerce platform with React and Node.js',
    description: `A full-featured e-commerce platform built with React, Node.js, and MongoDB. 
                 Features include user authentication, product management, shopping cart, 
                 payment integration, and order tracking. The platform is fully responsive
                 and provides a seamless shopping experience.`,
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Stripe'],
    images: [
      '/img/projects/ecommerce-1.jpg',
      '/img/projects/ecommerce-2.jpg',
      '/img/projects/ecommerce-3.jpg',
    ],
    githubLink: 'https://github.com/yourusername/ecommerce',
    liveLink: 'https://ecommerce-demo.com',
    category: 'fullstack',
  },
  {
    id: 2,
    title: 'Social Media Dashboard',
    shortDescription: 'Real-time social media analytics dashboard',
    description: `A comprehensive dashboard for social media analytics with real-time data updates. 
                 Features include customizable widgets, data visualization, and automated reporting.
                 Built with Next.js and real-time WebSocket connections.`,
    technologies: [
      'Next.js',
      'TypeScript',
      'Socket.io',
      'Chart.js',
      'TailwindCSS',
    ],
    images: [
      '/img/projects/ecommerce-4.jpg',
      '/img/projects/ecommerce-5.jpg',
      '/img/projects/ecommerce-6.jpg',
    ],
    githubLink: 'https://github.com/yourusername/social-dashboard',
    liveLink: 'https://dashboard-demo.com',
    category: 'frontend',
  },
  {
    id: 3,
    title: 'Fitness Tracking App',
    shortDescription: 'Mobile app for tracking workouts and nutrition',
    description: `A cross-platform mobile application for fitness enthusiasts. Track workouts,
                 monitor nutrition, set goals, and view progress over time. Features include
                 custom workout plans, meal tracking, and progress visualization.`,
    technologies: ['React Native', 'Firebase', 'Redux', 'Native Base'],
    images: [
      '/img/projects/ecommerce-7.jpg',
      '/img/projects/ecommerce-8.jpg',
      '/img/projects/ecommerce-9.jpg',
    ],
    githubLink: 'https://github.com/yourusername/fitness-app',
    liveLink: 'https://fitness-demo.com',
    category: 'mobile',
  },
  {
    id: 4,
    title: 'Task Management System',
    shortDescription: 'Enterprise task and project management platform',
    description: `A comprehensive project management solution with features like task tracking,
                 team collaboration, file sharing, and real-time updates. Includes reporting
                 and analytics for project insights.`,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'GraphQL', 'Docker'],
    images: [
      '/img/projects/ecommerce-10.jpg',
      '/img/projects/ecommerce-1.jpg',
      '/img/projects/ecommerce-2.jpg',
    ],
    githubLink: 'https://github.com/yourusername/task-management',
    liveLink: 'https://task-demo.com',
    category: 'fullstack',
  },
  {
    id: 5,
    title: 'Weather Forecast App',
    shortDescription: 'Real-time weather forecasting application',
    description: `A beautiful weather forecasting application with real-time updates,
                 interactive maps, and detailed weather information. Features include
                 location-based forecasts, severe weather alerts, and historical data.`,
    technologies: ['React', 'OpenWeather API', 'Mapbox', 'TailwindCSS'],
    images: [
      '/img/projects/ecommerce-3.jpg',
      '/img/projects/ecommerce-4.jpg',
      '/img/projects/ecommerce-5.jpg',
    ],
    githubLink: 'https://github.com/yourusername/weather-app',
    liveLink: 'https://weather-demo.com',
    category: 'frontend',
  },
  {
    id: 6,
    title: 'Food Delivery App',
    shortDescription: 'Mobile app for food ordering and delivery',
    description: `A feature-rich food delivery application with real-time order tracking,
                 payment processing, and restaurant management. Includes features like
                 order scheduling, favorite restaurants, and delivery tracking.`,
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io'],
    images: [
      '/img/projects/ecommerce-6.jpg',
      '/img/projects/ecommerce-7.jpg',
      '/img/projects/ecommerce-8.jpg',
    ],
    githubLink: 'https://github.com/yourusername/food-delivery',
    liveLink: 'https://food-demo.com',
    category: 'mobile',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filter, setFilter] = useState<
    'all' | 'frontend' | 'fullstack' | 'mobile'
  >('all');

  const filteredProjects = projects.filter(
    (project) => filter === 'all' || project.category === filter
  );

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  // Add this useEffect to handle body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <div id='projects' className='min-h-screen bg-[#0F1624] py-20 scroll-mt-10'>
      <div className='container mx-auto px-4'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <motion.h1
            className='text-4xl md:text-5xl font-bold text-white mb-6'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Projects
          </motion.h1>
          <motion.p
            className='text-gray-400 text-lg max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Here are some of my recent projects that showcase my skills and
            experience
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <div className='flex flex-wrap justify-center gap-4 mb-12'>
          {['all', 'frontend', 'fullstack', 'mobile'].map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category as typeof filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                        ${
                          filter === category
                            ? 'bg-[#FFD700] text-black'
                            : 'bg-[#171F38] text-gray-300 hover:bg-[#1A2332]'
                        }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          layout
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-${project.id}`}
              className='group relative bg-[#171F38] rounded-xl overflow-hidden cursor-pointer
                       hover:transform hover:-translate-y-2 transition-all duration-300'
              onClick={() => {
                setSelectedProject(project);
                setCurrentImageIndex(0);
              }}
            >
              <div className='relative h-48 overflow-hidden'>
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-bold text-white mb-2'>
                  {project.title}
                </h3>
                <p className='text-gray-400 text-sm mb-4'>
                  {project.shortDescription}
                </p>
                <div className='flex flex-wrap gap-2'>
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className='px-2 py-1 text-xs bg-[#0F1624] text-gray-300 rounded-full'
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className='px-2 py-1 text-xs bg-[#0F1624] text-gray-300 rounded-full'>
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className='fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 md:p-6'
              >
                <motion.div
                  layoutId={`project-${selectedProject.id}`}
                  className='w-full max-w-4xl bg-[#171F38] rounded-xl z-[70] overflow-hidden max-h-[90vh] overflow-y-auto'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className='absolute top-2 right-2 md:top-4 md:right-4 text-white z-10 p-2 
                             hover:bg-white/10 rounded-full bg-black/20'
                  >
                    <FaTimes className='text-lg md:text-xl' />
                  </button>

                  {/* Image Carousel */}
                  <div className='relative w-full aspect-video md:aspect-[16/9]'>
                    <Image
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} preview`}
                      fill
                      className='object-contain bg-black/20'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
                      priority
                    />
                    {selectedProject.images.length > 1 && (
                      <>
                        {/* Navigation Arrows */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          className='absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 
                                   p-2 md:p-3 rounded-full hover:bg-black/75 transition-colors text-white'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={2}
                            stroke='currentColor'
                            className='w-4 h-4 md:w-6 md:h-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15.75 19.5L8.25 12l7.5-7.5'
                            />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          className='absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 
                                   p-2 md:p-3 rounded-full hover:bg-black/75 transition-colors text-white'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={2}
                            stroke='currentColor'
                            className='w-4 h-4 md:w-6 md:h-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M8.25 4.5l7.5 7.5-7.5 7.5'
                            />
                          </svg>
                        </button>

                        {/* Image Indicators */}
                        <div className='absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2'>
                          {selectedProject.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(index);
                              }}
                              className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all duration-300 
                                      ${
                                        currentImageIndex === index
                                          ? 'bg-white w-3 md:w-4'
                                          : 'bg-white/50 hover:bg-white/75'
                                      }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className='p-4 md:p-6'>
                    <h2 className='text-xl md:text-2xl font-bold text-white mb-3 md:mb-4'>
                      {selectedProject.title}
                    </h2>
                    <p className='text-sm md:text-base text-gray-400 mb-4 md:mb-6'>
                      {selectedProject.description}
                    </p>

                    {/* Technologies */}
                    <div className='mb-4 md:mb-6'>
                      <h3 className='text-white font-semibold mb-2'>
                        Technologies Used:
                      </h3>
                      <div className='flex flex-wrap gap-1.5 md:gap-2'>
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className='px-2 md:px-3 py-1 text-xs md:text-sm bg-[#0F1624] 
                                     text-gray-300 rounded-full'
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className='flex flex-wrap gap-3 md:gap-4'>
                      {selectedProject.githubLink && (
                        <a
                          href={selectedProject.githubLink}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0F1624] 
                                   text-white rounded-full hover:bg-[#1A2332] transition-colors
                                   text-sm md:text-base'
                        >
                          <FaGithub /> View Code
                        </a>
                      )}
                      {selectedProject.liveLink && (
                        <a
                          href={selectedProject.liveLink}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#FFD700] 
                                   text-black rounded-full hover:bg-[#FFE55C] transition-colors
                                   text-sm md:text-base'
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
