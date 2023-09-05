import React, { useEffect, useState } from 'react';
import HomeLogo from '../img/home_logo.png';
import { Link } from 'react-router-dom';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import Swal from 'sweetalert2';


const Hero = () => {
  const [words] = useTypewriter({
    words: ["Men's Clothing", "Women's Clothing", "Jewelery", "Electronics"],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 80,
  });


  const [clickMe] = useTypewriter({
    words: ["Click here and get your coupon!"],
    loop: { loopCount: 1 },
    typeSpeed: 120,
    deleteSpeed: 80,
    closeOnClick: true,
  });


  const [couponList] = useState(['SALESALESALE', 'SPARKLE', 'FASHIONISTA', 'GEEKGOLD']);
  const [showCoupon, setShowCoupon] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState('');


  const generateRandomCoupon = () => {
    const randomIndex = Math.floor(Math.random() * couponList.length);
    setCurrentCoupon(couponList[randomIndex]);
  };


  useEffect(() => {
    const delay = 60000; 
    const timer = setTimeout(() => {
      setShowCoupon(true);
      generateRandomCoupon();
    }, delay);
    return () => clearTimeout(timer);
  }, [couponList]);


  const showAlert = () => {
    Swal.fire({
      title: 'Coupon Code',
      text: `Your free discount coupon: ${currentCoupon}`,
      showCancelButton: true,
      confirmButtonText: 'Copy',
    }).then((result) => {
      if (result.isConfirmed) {
        navigator.clipboard.writeText(currentCoupon).then(() => {
          Swal.fire('Coupon code copied!', '', 'success');
        }).catch((error) => {
          console.error('Copy failed:', error);
          Swal.fire('Copy failed', 'Please try again', 'error');
        });
      }
    });
  };
  
  
  return (
    <section className='bg-orange-200 h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24'>
      <div className="container mx-auto flex justify-around h-full">
        <div className='flex flex-col justify-center'>
          <div className='font-semibold flex items-center uppercase'>
            <div className='w-10 text-[40px]'>AdornUtopia</div>
          </div>
          <h1 className='text-[70px] leading-[1.1] font-light mb-4'>
            SUMMER SALE HAVE <br/>
            <span className='font-semibold'>STARTED</span>
          </h1>
          <div className='self-start uppercase text-[18px] font-semibold border-b-2 border-primary'>
              Everything You Imagine Is On AdornUtopia: {' '}
          </div>
          <div className='self-start uppercase text-[18px] font-semibold'>
              {words}
              <Cursor/>
          </div>
          <br/>
          <Link className='self-start uppercase text-[30px] leading-[1.1] font-light'> Get free discount coupons <br/>
              <span className='font-semibold'>every 1 minute:</span>
          </Link>
          {showCoupon && (
          <Link onClick={() =>{ showAlert(); generateRandomCoupon(); }} className='self-start uppercase font-semibold border-primary'>
            {clickMe}
            <Cursor/>
          </Link>
          )}
        </div>
        <div className='hidden lg:block'>
          <img src={HomeLogo} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
