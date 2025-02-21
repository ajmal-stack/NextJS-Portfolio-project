'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebookF />, href: '#' },
    { icon: <FaTwitter />, href: '#' },
    { icon: <FaInstagram />, href: '#' },
    { icon: <FaLinkedinIn />, href: '#' },
    { icon: <FaGithub />, href: '#' },
  ];

  const quickLinks = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

  return (
    <footer className='bg-[#0F1624] text-gray-300'>
      {/* Main Footer */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold text-white mb-4'>About Us</h3>
            <p className='text-gray-400 leading-relaxed'>
              We are a creative digital agency focused on growing brands online
              through innovative web solutions and digital marketing strategies.
            </p>
            <div className='flex space-x-4 pt-4'>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors'
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-xl font-bold text-white mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase()}`}
                    className='text-gray-400 hover:text-white transition-colors duration-300'
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-xl font-bold text-white mb-4'>Contact Info</h3>
            <ul className='space-y-4'>
              <li className='flex items-center space-x-3'>
                <FaMapMarkerAlt className='text-gray-400' />
                <span className='text-gray-400'>
                  123 Business Street, New York, USA
                </span>
              </li>
              <li className='flex items-center space-x-3'>
                <FaPhone className='text-gray-400' />
                <span className='text-gray-400'>+1 234 567 8900</span>
              </li>
              <li className='flex items-center space-x-3'>
                <FaEnvelope className='text-gray-400' />
                <span className='text-gray-400'>info@yourcompany.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className='text-xl font-bold text-white mb-4'>Newsletter</h3>
            <p className='text-gray-400 mb-4'>
              Subscribe to our newsletter for updates and insights.
            </p>
            <form className='space-y-3'>
              <input
                type='email'
                placeholder='Your email address'
                className='w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <motion.button
                type='submit'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300'
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400 text-sm text-center md:text-left'>
              © {currentYear} Your Company Name. All rights reserved.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <Link
                href='/privacy'
                className='text-gray-400 hover:text-white text-sm transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-gray-400 hover:text-white text-sm transition-colors'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
