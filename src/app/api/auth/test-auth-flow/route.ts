import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    return NextResponse.json(
      {
        message: 'Auth configuration test',
        authenticated: !!session,
        session: session,
        providers: {
          google: !!process.env.GOOGLE_ID && !!process.env.GOOGLE_SECRET,
          credentials: true,
        },
        urls: {
          nextauth: process.env.NEXTAUTH_URL,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Auth test failed',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
