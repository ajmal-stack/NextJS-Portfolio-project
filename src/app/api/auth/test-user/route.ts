import { NextResponse } from 'next/server';
import connectDB from '@/server/db/mongodb';
import User from '@/server/models/user.model';

export async function POST() {
  try {
    await connectDB();

    // Create a test user
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    return NextResponse.json(
      {
        message: 'Test user created successfully',
        user: {
          id: testUser._id,
          name: testUser.name,
          email: testUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to create test user',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
