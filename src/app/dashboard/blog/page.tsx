'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Blog {
  _id: string;
  title: string;
  status: 'draft' | 'published';
  createdAt: string;
}

export default function BlogDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        throw new Error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
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
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-white'>Blog Posts</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/dashboard/blog/new')}
          className='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 
                   transition-colors flex items-center gap-2'
        >
          <FaPlus /> New Post
        </motion.button>
      </div>

      <div className='bg-[#0F1624] rounded-lg overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-white'>
            <thead className='text-gray-400 border-b border-gray-700'>
              <tr>
                <th className='py-3 px-4 text-left'>Title</th>
                <th className='py-3 px-4 text-left'>Status</th>
                <th className='py-3 px-4 text-left'>Date</th>
                <th className='py-3 px-4 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className='border-b border-gray-700'>
                  <td className='py-4 px-4'>{blog.title}</td>
                  <td className='py-4 px-4'>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        blog.status === 'published'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className='py-4 px-4'>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className='py-4 px-4'>
                    <div className='flex gap-2'>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          router.push(`/dashboard/blog/${blog._id}/edit`)
                        }
                        className='p-2 text-blue-400 hover:text-blue-300'
                      >
                        <FaEdit />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(blog._id)}
                        className='p-2 text-red-400 hover:text-red-300'
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
