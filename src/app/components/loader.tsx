import React from 'react';
import Image from 'next/image';

const Loader = () => {
  return (
    <Image
      src='/censys-mark-loader.png'
      alt='censys-mark'
      width={133}
      height={70}
      className='opacity-45'
      priority
    ></Image>
  );
};

export default Loader;
