import Image from 'next/image';
import { blogPosts } from '@/app/data/blogPosts';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface Props {
  params: {
    id: string;
  };
}

export default function BlogPost({ params }: Props) {
  const { id } = params;
  const post = blogPosts.find((post) => post.id.toString() === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className='min-h-screen bg-[#0B0F16] pt-28 pb-12 px-4 sm:px-6 lg:px-8'>
      <article className='max-w-4xl mx-auto'>
        <Link
          href='/blog'
          className='inline-flex items-center text-purple-500 hover:text-purple-400 mb-8'
          prefetch={true}
        >
          <span>← Back to Blog</span>
        </Link>

        <div className='relative w-full h-[400px] mb-8'>
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className='object-cover rounded-lg'
          />
        </div>

        <div className='text-sm text-purple-500 font-semibold mb-2'>
          {post.category}
        </div>

        <h1 className='text-4xl font-bold text-white mb-4'>{post.title}</h1>

        <div className='text-gray-400 mb-8'>{post.date}</div>

        <div className='prose prose-invert max-w-none'>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
