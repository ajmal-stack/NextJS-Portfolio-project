import { NextResponse } from 'next/server';
import connectDB from '@/server/db/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // Test the environment variable first
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    // Try to connect
    await connectDB();

    // Check connection status
    const readyState = mongoose.connection.readyState;
    const readyStateMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    // Test basic database operation
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    return NextResponse.json(
      {
        message: 'Database connected successfully',
        status: readyStateMap[readyState],
        database: mongoose.connection.db.databaseName,
        host: mongoose.connection.host,
        collections: collections.map((col) => col.name),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Database connection test failed:', {
      error: error.message,
      code: error.code,
      name: error.name,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error: 'Database connection failed',
        details: error.message,
        code: error.code,
        name: error.name,
      },
      { status: 500 }
    );
  }
}
