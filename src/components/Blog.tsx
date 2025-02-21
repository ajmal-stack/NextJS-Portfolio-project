import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';

export default function Blog() {
  return (
    <div id='blog' className='min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-white mb-4'>Blog</h1>
          <p className='text-xl text-gray-400'>
            Explore the latest articles and insights
          </p>
        </div>

        {/* Blog post grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className='bg-[#1A1F29] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-800'
            >
              <Link href={`/blog/${post.id}`}>
                <div className='relative h-48 w-full'>
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className='object-cover'
                  />
                </div>
                <div className='p-6'>
                  <div className='text-sm text-purple-500 font-semibold mb-1'>
                    {post.category}
                  </div>
                  <h2 className='text-xl font-semibold text-white mb-2'>
                    {post.title}
                  </h2>
                  <p className='text-gray-400 mb-4'>{post.excerpt}</p>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500'>{post.date}</span>
                    <span className='text-purple-500 font-medium hover:text-purple-400'>
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
