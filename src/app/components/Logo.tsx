'use client';

import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src='/img/logo/ajmal-light-logo.svg'
      alt='Logo'
      width={40}
      height={40}
      priority
    />
  );
};

export default Logo;
