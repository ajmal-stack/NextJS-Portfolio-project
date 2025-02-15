'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function Profile() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      // Update session with new data
      await update({
        ...session,
        user: {
          ...session?.user,
          name: formData.name,
        },
      });

      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#0F1624] py-20'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='max-w-2xl mx-auto bg-[#171F38] rounded-xl p-8'
        >
          <div className='flex items-center space-x-4 mb-8'>
            <div className='relative w-20 h-20 rounded-full overflow-hidden'>
              <Image
                src={session?.user?.image || '/default-avatar.png'}
                alt='Profile'
                fill
                className='object-cover'
              />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-white'>
                Profile Settings
              </h1>
              <p className='text-gray-400'>Update your personal information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='name'
                className='text-gray-400 text-sm block mb-1'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className='w-full bg-[#0F1624] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='text-gray-400 text-sm block mb-1'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                value={formData.email}
                disabled
                className='w-full bg-[#0F1624] rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed'
              />
              <p className='text-xs text-gray-500 mt-1'>
                Email cannot be changed
              </p>
            </div>

            <div>
              <label htmlFor='bio' className='text-gray-400 text-sm block mb-1'>
                Bio
              </label>
              <textarea
                id='bio'
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={4}
                className='w-full bg-[#0F1624] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>

            <div className='border-t border-gray-700 pt-6'>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Change Password
              </h3>
              <div className='space-y-4'>
                <div>
                  <label
                    htmlFor='currentPassword'
                    className='text-gray-400 text-sm block mb-1'
                  >
                    Current Password
                  </label>
                  <input
                    type='password'
                    id='currentPassword'
                    value={formData.currentPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentPassword: e.target.value,
                      })
                    }
                    className='w-full bg-[#0F1624] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                  />
                </div>
                <div>
                  <label
                    htmlFor='newPassword'
                    className='text-gray-400 text-sm block mb-1'
                  >
                    New Password
                  </label>
                  <input
                    type='password'
                    id='newPassword'
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    className='w-full bg-[#0F1624] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                  />
                </div>
                <div>
                  <label
                    htmlFor='confirmPassword'
                    className='text-gray-400 text-sm block mb-1'
                  >
                    Confirm New Password
                  </label>
                  <input
                    type='password'
                    id='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className='w-full bg-[#0F1624] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                  />
                </div>
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                disabled={loading}
                className='bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold 
                         hover:bg-purple-600 transition-colors disabled:opacity-50 
                         disabled:cursor-not-allowed'
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
