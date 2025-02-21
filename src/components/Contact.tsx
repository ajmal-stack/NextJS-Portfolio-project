'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { showToast } from '@/components/Toast';

// Update the initialization with the correct public key
emailjs.init('BhK_qOapbLq7mNd8f'); // This is your public key

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    success: false,
  });
  const [cooldownTime, setCooldownTime] = useState<number | null>(null);

  // Move cooldown check to useEffect
  useEffect(() => {
    const lastMessageTime = localStorage.getItem('lastMessageTime');
    if (lastMessageTime) {
      const cooldownPeriod = 24 * 60 * 60 * 1000;
      const timeSinceLastMessage = Date.now() - parseInt(lastMessageTime);

      if (timeSinceLastMessage < cooldownPeriod) {
        const hoursRemaining = Math.ceil(
          (cooldownPeriod - timeSinceLastMessage) / (1000 * 60 * 60)
        );
        setCooldownTime(hoursRemaining);
        toast.error(`You can send another message in ${hoursRemaining} hours`);
      } else {
        setCooldownTime(null);
      }
    }
  }, []);

  const checkMessageCooldown = (): boolean => {
    if (cooldownTime !== null) {
      toast.error(
        `Please wait ${cooldownTime} hours before sending another message`
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add a test toast to verify the system is working
    toast.success('Test toast');

    if (!checkMessageCooldown()) {
      return;
    }

    setStatus({ loading: true, error: false, success: false });

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      showToast({
        message: 'Please fill in all fields',
        type: 'error',
      });
      setStatus({ loading: false, error: true, success: false });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      setStatus({ loading: false, error: true, success: false });
      return;
    }

    try {
      await emailjs.send('service_a8xl9ik', 'template_w8rl63y', {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Admin',
        reply_to: formData.email,
      });

      localStorage.setItem('lastMessageTime', Date.now().toString());
      setCooldownTime(24); // Set cooldown time after successful send

      setStatus({ loading: false, error: false, success: true });
      setFormData({ name: '', email: '', message: '' });

      // Add console.log to debug
      console.log('Showing success toast');
      showToast({
        message: 'Message sent successfully! I will get back to you soon.',
        type: 'success',
      });
    } catch (error) {
      console.error('FAILED...', error);
      setStatus({ loading: false, error: true, success: false });

      // Add console.log to debug
      console.log('Showing error toast');
      showToast({
        message: 'Failed to send message. Please try again later.',
        type: 'error',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // Log environment variables (remove in production)
  useEffect(() => {
    console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
    console.log('Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
    console.log(
      'Public Key exists:',
      !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );
  }, []);

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
            I&apos;m currently looking for new opportunities. Whether you have a
            question or just want to say hi, I&apos;ll try my best to get back
            to you!
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
            <form onSubmit={handleSubmit} className='space-y-4'>
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
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className='w-full bg-[#0F1624] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='Your message'
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full bg-purple-500 text-white py-3 rounded-lg font-semibold 
                          hover:bg-purple-600 transition-colors disabled:opacity-50 
                          disabled:cursor-not-allowed'
                disabled={status.loading || cooldownTime !== null}
              >
                {status.loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
