import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Modern Portfolio',
  description: 'Advanced UI Portfolio with animations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className={`${inter.className} bg-[#0F1624] text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
