import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FaCalendar, FaTag } from 'react-icons/fa';

async function getBlog(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) throw new Error('Failed to fetch blog');

    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);

  if (!blog) {
    notFound();
  }

  return (
    <article className='max-w-4xl mx-auto px-4 py-8'>
      {blog.image && (
        <div className='relative w-full h-[400px] mb-8 rounded-lg overflow-hidden'>
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className='object-cover'
          />
        </div>
      )}

      <h1 className='text-4xl font-bold text-white mb-4'>{blog.title}</h1>

      <div className='flex items-center gap-4 text-gray-400 mb-8'>
        <div className='flex items-center gap-2'>
          <FaCalendar />
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        {blog.tags?.length > 0 && (
          <div className='flex items-center gap-2'>
            <FaTag />
            <div className='flex gap-2'>
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className='bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-sm'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className='prose prose-invert max-w-none'
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
