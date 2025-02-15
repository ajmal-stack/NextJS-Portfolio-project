'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function NewBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    image: '',
    status: 'draft' as 'draft' | 'published',
  });

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <div className='flex items-center gap-4 mb-6'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className='text-white hover:text-purple-400 transition-colors'
        >
          <FaArrowLeft className='text-xl' />
        </motion.button>
        <h1 className='text-2xl font-bold text-white'>Create New Blog Post</h1>
      </div>

      <form className='space-y-6'>
        <div className='bg-[#0F1624] p-6 rounded-lg'>
          <div className='space-y-4'>
            {/* Title Input */}
            <div>
              <label htmlFor='title' className='block text-white mb-2'>
                Title
              </label>
              <input
                type='text'
                id='title'
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className='w-full bg-[#171F38] text-white rounded-lg p-3 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none'
                placeholder='Enter blog title'
                required
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label htmlFor='content' className='block text-white mb-2'>
                Content
              </label>
              <textarea
                id='content'
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={10}
                className='w-full bg-[#171F38] text-white rounded-lg p-3 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-y min-h-[200px]'
                placeholder='Write your blog content here...'
                required
              />
              <p className='text-gray-400 text-sm mt-1'>
                Supports markdown formatting
              </p>
            </div>

            {/* Featured Image URL */}
            <div>
              <label htmlFor='image' className='block text-white mb-2'>
                Featured Image URL
              </label>
              <input
                type='url'
                id='image'
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className='w-full bg-[#171F38] text-white rounded-lg p-3 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none'
                placeholder='https://example.com/image.jpg'
              />
            </div>

            {/* Tags Input */}
            <div>   
              <label htmlFor='tags' className='block text-white mb-2'>
                Tags (comma-separated)
              </label>
              <input
                type='text'
                id='tags'
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className='w-full bg-[#171F38] text-white rounded-lg p-3 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none'
                placeholder='e.g., nextjs, react, web development'
              />
            </div>

            {/* Status Select */}
            <div>
              <label htmlFor='status' className='block text-white mb-2'>
                Status
              </label>
              <select
                id='status'
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'draft' | 'published',
                  })
                }
                className='w-full bg-[#171F38] text-white rounded-lg p-3 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none'
              >
                <option value='draft'>Draft</option>
                <option value='published'>Published</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end gap-3'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            type='button'
            className='px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 
                     transition-colors flex items-center gap-2'
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            className='px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 
                     transition-colors flex items-center gap-2'
          >
            <FaSave /> Save Post
          </motion.button>
        </div>
      </form>
    </div>
  );
}
