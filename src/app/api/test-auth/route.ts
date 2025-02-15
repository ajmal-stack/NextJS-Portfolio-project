import { NextResponse } from 'next/server';
import connectDB from '@/server/db/mongodb';
import User from '@/server/models/user.model';

export async function GET() {
  try {
    // Test database connection
    await connectDB();

    // Test environment variables
    const configCheck = {
      mongodb: !!process.env.MONGODB_URI,
      googleId: !!process.env.GOOGLE_ID,
      googleSecret: !!process.env.GOOGLE_SECRET,
      nextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nextAuthUrl: !!process.env.NEXTAUTH_URL,
    };

    // Test User model
    const userCount = await User.countDocuments();

    return NextResponse.json(
      {
        message: 'Configuration test completed',
        configCheck,
        databaseConnected: true,
        userModelWorking: true,
        userCount,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Configuration test failed:', error);
    return NextResponse.json(
      {
        error: error.message || 'Configuration test failed',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
