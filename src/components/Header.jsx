import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';
import { AiOutlineShopping } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png';


const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);


  useEffect(()=> {
    window.addEventListener('scroll', ()=> {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });


  const scrollToTop = () => {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth',
    });
  }

  
  return (
    <header className={`${
      isActive ? 'bg-white py-4 shadow-md' : 'bg-orange-200 py-6'} fixed w-full z-10 transition-all`}>
      <div className='container mx-auto flex items-center justify-between h-full' onClick={scrollToTop}>
        <Link to={'/'}>
          <div>
            <img className='w-[40px]' src={Logo} alt="" />
          </div>
        </Link>
        
        <div className='cursor-pointer flex relative' onClick={() => setIsOpen(!isOpen)}>
          <AiOutlineShopping className='text-3xl hover:text-4xl transition-all duration-200' />
          <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>{itemAmount}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
