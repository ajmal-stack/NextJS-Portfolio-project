import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/config';
import connectDB from '@/server/db/mongodb';
import Blog from '@/server/models/blog.model';

// Get all blogs
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// Create new blog
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, tags, image, status } = await req.json();

    await connectDB();

    const blog = await Blog.create({
      title,
      content,
      tags,
      image,
      status,
      author: session.user.id,
    });

    return NextResponse.json(
      {
        message: 'Blog post created successfully',
        blog: {
          id: blog._id,
          title: blog.title,
          status: blog.status,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Blog creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
