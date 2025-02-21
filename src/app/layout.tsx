import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Toaster } from 'react-hot-toast';
import { toasterConfig } from '../components/Toast';
import { Providers } from './providers';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Modern Portfolio',
  description: 'Advanced UI Portfolio with animations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body
        className={`${inter.className} bg-[#0F1624] text-white`}
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          <main className='pb-16 md:pb-0'>{children}</main>
        </Providers>

        <Toaster containerStyle={toasterConfig.containerStyle} />
      </body>
    </html>
  );
}
