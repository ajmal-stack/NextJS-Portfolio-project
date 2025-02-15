'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaUser, FaPen, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className='min-h-screen bg-[#0F1624] py-20'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-[#171F38] rounded-xl p-8'
        >
          <div className='flex items-center space-x-4 mb-8'>
            <div className='relative w-16 h-16 rounded-full overflow-hidden'>
              <Image
                src={session?.user?.image || '/default-avatar.png'}
                alt='Profile'
                fill
                className='object-cover'
              />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-white'>
                Welcome, {session?.user?.name}!
              </h1>
              <p className='text-gray-400'>{session?.user?.email}</p>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-6'>
            <DashboardCard
              title='Profile'
              description='View and edit your profile'
              icon={<FaUser className='text-3xl text-purple-500' />}
              onClick={() => router.push('/profile')}
            />
            <DashboardCard
              title='Blog Posts'
              description='Manage your blog posts'
              icon={<FaPen className='text-3xl text-purple-500' />}
              onClick={() => router.push('/dashboard/blog')}
            />
          </div>

          <div className='mt-8 bg-[#0F1624] rounded-lg p-6'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-bold text-white'>
                Recent Blog Posts
              </h2>
              <button
                onClick={() => router.push('/dashboard/blog/new')}
                className='px-4 py-2 bg-purple-500 text-white rounded-lg 
                         hover:bg-purple-600 transition-colors flex items-center gap-2'
              >
                <FaPlus /> New Post
              </button>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full text-white'>
                <thead className='text-gray-400 border-b border-gray-700'>
                  <tr>
                    <th className='py-3 text-left'>Title</th>
                    <th className='py-3 text-left'>Status</th>
                    <th className='py-3 text-left'>Date</th>
                    <th className='py-3 text-left'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* We'll populate this with actual blog data later */}
                  <tr className='border-b border-gray-700'>
                    <td className='py-4'>Getting Started with Next.js</td>
                    <td className='py-4'>
                      <span className='px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-sm'>
                        Published
                      </span>
                    </td>
                    <td className='py-4'>Mar 15, 2024</td>
                    <td className='py-4'>
                      <div className='flex gap-2'>
                        <button className='p-2 text-blue-400 hover:text-blue-300'>
                          <FaEdit />
                        </button>
                        <button className='p-2 text-red-400 hover:text-red-300'>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className='bg-[#0F1624] p-6 rounded-lg cursor-pointer 
                 hover:bg-opacity-80 transition-all duration-300'
    >
      <div className='flex items-center gap-4'>
        {icon}
        <div>
          <h3 className='text-xl font-semibold text-white mb-2'>{title}</h3>
          <p className='text-gray-400 text-sm'>{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
