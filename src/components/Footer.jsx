import React from 'react';
import { Link } from 'react-router-dom';
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from 'react-icons/bi';


const Footer = () => {
  return (
    <footer className='bg-primary py-12'>
      <div className="container mx-auto">
        <p className='text-white text-center'>Copyright &copy; AdornUtopia 2023. All Rights Reserved.</p>
          <div className='flex text-center justify-center gap-4 pt-6 text-white text-center text-2xl transition duration-300'>
            <Link  target='_blank' to={'https://www.facebook.com/ceyhun.isazadeh'}>
              <BiLogoFacebook className='hover:scale-110 hover:text-blue-500 transition duration-300' />
            </Link>
            <Link target='_blank' to={'https://www.instagram.com/ceyhun.isazadeh/'}>
              <BiLogoInstagram className='hover:scale-110 hover:text-orange-400 transition duration-300' />
            </Link>
            <Link target='_blank' to={'https://twitter.com/ceyhun_isazadeh'}>
              <BiLogoTwitter className='hover:scale-110 hover:text-blue-500 transition duration-300' />
            </Link>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
