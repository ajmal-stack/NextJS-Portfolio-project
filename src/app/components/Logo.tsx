'use client';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className='w-24 h-12 flex items-center justify-center group'>
      <Image
        src='/img/logo/ajmal-light-logo.svg'
        alt='Logo'
        width={96}
        height={48}
        className='w-full h-full object-contain transition-all duration-300 
                   filter hover:brightness-125 hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]'
        priority
        style={{
          filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.4))',
        }}
      />
    </div>
  );
};

export default Logo;
