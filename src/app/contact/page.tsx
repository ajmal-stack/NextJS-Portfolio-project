'use client';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function Contact() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div id='contact' className='min-h-screen pt-20 bg-[#0F1624]'>
      <div className='container mx-auto px-4 py-12'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12'
        >
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Get In Touch
          </h1>
          <p className='text-gray-400 max-w-2xl mx-auto text-sm md:text-base'>
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, I'll try my best to get back to
            you!
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
          {/* Contact Information */}
          <motion.div
            {...fadeIn}
            className='bg-[#171F38] rounded-xl p-6 md:p-8'
          >
            <h2 className='text-2xl md:text-3xl font-bold text-white mb-6'>
              Contact Information
            </h2>
            <div className='space-y-6'>
              <div className='flex items-center space-x-4'>
                <div className='bg-purple-500/10 p-3 rounded-full'>
                  <FaEnvelope className='text-purple-500 text-xl' />
                </div>
                <div>
                  <h3 className='text-gray-400 text-sm'>Email</h3>
                  <a
                    href='mailto:your.email@example.com'
                    className='text-white hover:text-purple-500 transition-colors'
                  >
                    your.email@example.com
                  </a>
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center space-x-4'>
                  <div className='bg-purple-500/10 p-3 rounded-full'>
                    <FaMapMarkerAlt className='text-purple-500 text-xl' />
                  </div>
                  <div>
                    <h3 className='text-gray-400 text-sm'>Location</h3>
                    <p className='text-white'>Your Location, Country</p>
                  </div>
                </div>

                {/* Embedded Google Map */}
                <div className='w-full h-[200px] rounded-xl overflow-hidden mt-4'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14010.760057306577!2d77.22260515269541!3d28.609074898799363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2db961be393%3A0xf6c7ef5ee6dd10ae!2sIndia%20Gate%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1739278980358!5m2!1sen!2sin'
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    className='rounded-xl'
                  ></iframe>
                </div>
              </div>

              <div className='pt-6'>
                <h3 className='text-white font-semibold mb-4'>Social Media</h3>
                <div className='flex space-x-4'>
                  <a
                    href='https://github.com/yourusername'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-[#0F1624] p-3 rounded-full hover:bg-purple-500/10 transition-colors'
                  >
                    <FaGithub className='text-white text-xl' />
                  </a>
                  <a
                    href='https://linkedin.com/in/yourusername'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-[#0F1624] p-3 rounded-full hover:bg-purple-500/10 transition-colors'
                  >
                    <FaLinkedin className='text-white text-xl' />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            {...fadeIn}
            className='bg-[#171F38] rounded-xl p-6 md:p-8'
          >
            <h2 className='text-2xl md:text-3xl font-bold text-white mb-6'>
              Send Message
            </h2>
            <form className='space-y-4'>
              <div>
                <label
                  htmlFor='name'
                  className='text-gray-400 text-sm mb-1 block'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='w-full bg-[#0F1624] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='Your name'
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='text-gray-400 text-sm mb-1 block'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='w-full bg-[#0F1624] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='Your email'
                />
              </div>
              <div>
                <label
                  htmlFor='message'
                  className='text-gray-400 text-sm mb-1 block'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  rows={4}
                  className='w-full bg-[#0F1624] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='Your message'
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors'
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
