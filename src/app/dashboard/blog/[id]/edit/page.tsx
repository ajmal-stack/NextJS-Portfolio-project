'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface BlogPost {
  title: string;
  content: string;
  tags: string[];
  image: string;
  status: string;
}

export default function EditBlog({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    content: '',
    tags: [],
    image: '',
    status: 'draft',
  });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch blog');
      const data = await response.json();
      setFormData({
        ...data,
        tags: data.tags.join(', '),
      });
    } catch (error) {
      console.error('Error fetching blog:', error);
      alert('Failed to fetch blog post');
      router.push('/dashboard/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags:
            typeof formData.tags === 'string'
              ? formData.tags.split(',').map((tag) => tag.trim())
              : formData.tags,
        }),
      });

      if (!response.ok) throw new Error('Failed to update blog post');

      router.push('/dashboard/blog');
      router.refresh();
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
      </div>
    );
  }

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
        <h1 className='text-2xl font-bold text-white'>Edit Blog Post</h1>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='bg-[#0F1624] p-6 rounded-lg'>
          <div className='space-y-4'>
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
                required
              />
            </div>

            <div>
              <label htmlFor='content' className='block text-white mb-2'>
                Content
              </label>
              <div className='bg-[#171F38] rounded-lg'>
                <ReactQuill
                  theme='snow'
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  className='text-white'
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image', 'code-block'],
                      ['clean'],
                    ],
                  }}
                />
              </div>
            </div>

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
              />
            </div>

            <div>
              <label htmlFor='tags' className='block text-white mb-2'>
                Tags (comma-separated)
              </label>
              <input
                type='text'
                id='tags'
                value={formData.tags.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tags: e.target.value.split(',').map((tag) => tag.trim()),
                  })
                }
                className='w-full bg-[#171F38] text-white rounded-lg p-3 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none'
                placeholder='e.g., nextjs, react, web development'
              />
            </div>

            <div>
              <label htmlFor='status' className='block text-white mb-2'>
                Status
              </label>
              <select
                id='status'
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className='w-full bg-[#171F38] text-white rounded-lg p-3 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none'
              >
                <option value='draft'>Draft</option>
                <option value='published'>Published</option>
              </select>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            disabled={saving}
            className='px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 
                     transition-colors flex items-center gap-2 disabled:opacity-50'
          >
            {saving ? (
              <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white'></div>
            ) : (
              <>
                <FaSave /> Save Post
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
