import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import CartItem from '../components/CartItem';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';
import Swal from 'sweetalert2';
import '../index.css';


const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount, setTotal } = useContext(CartContext);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  useEffect(() => {
    setIsCartEmpty(cart.length === 0);
  }, [cart]);

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const discountCodes = ['SALESALESALE', 'SPARKLE', 'FASHIONISTA', 'GEEKGOLD',];


  const applyDiscount = () => {
    if (discountCodes.includes(discountCode)) {
      setDiscountApplied(true);
      const discountRate = 0.85; 
      const newTotalValue = total * discountRate;
      setTotal(newTotalValue);
      
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Your discount coupon has been successfully applied',
        showConfirmButton: false,
        timer: 3000
      });
    } else {
      setDiscountApplied(false);
      setTotal(total);
    

      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Invalid discount coupon. Please try again',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };


  const buttonAlert = () => {
    Swal.fire({
      title: 'Do you confirm your order?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      denyButtonText: `Remove`,
      customClass: {
        confirmButton: 'alert-button confirm',
        cancelButton: 'alert-button cancel',
        denyButton: 'alert-button deny',
        title: 'alert-title',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Your order has been received', '', 'success');
        clearCart();
      } else if (result.isDenied) {
        Swal.fire('Your order has been removed', '', 'error')
      }
    });
      const denyButton = document.querySelector('.swal2-deny');
      denyButton.addEventListener('click', () => clearCart()
    );
  };

  
  
  return (
    <div className={`${ isOpen ? 'right-0' : '-right-full' } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}>
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>Shopping Bag ({itemAmount})</div>
        <div className='cursor-pointer w-8 h-8 flex justify-center items-center' onClick={handleClose}>
          <IoMdArrowForward className='text-2xl' />
        </div>
      </div>
      <div className='flex flex-col gap-y-2 h-[400px] lg:h-[400px] overflow-y-auto overflow-x-hidden border-b'>
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
      })}
      </div>
      <div className='flex flex-col gap-y-3 py-4 mt-4'>
        <div className='flex w-full justify-between items-center'>
          <div className='uppercase font-semibold'>
            <span className='mr-2'>Total:</span> {discountApplied ? 
            (
              <>
                <span className="text-green-500 text-[24px] md:text-[22px] lg:text-[20px]">${total.toFixed(2)}</span>
              </>
            ) : (
              `$${total.toFixed(2)}`
            )}
          </div>
          <div onClick={clearCart} className='cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl'>
            <FiTrash2 />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <input type='text' disabled={isCartEmpty} placeholder='Enter Discount Code' value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} className={`bg-red-500 flex p-4 justify-center items-center text-white w-full font-medium outline-none hover:bg-red-600 focus:bg-red-400 transition duration-300 ${isCartEmpty ? 'pointer-events-none opacity-50' : 'hover:bg-red-500'} `}/>
          <button disabled={discountApplied} onClick={applyDiscount} className={`bg-gray-400 flex p-4 justify-center items-center text-white h-14 font-medium hover:bg-orange-500 transition duration-300 ${isCartEmpty ? 'pointer-events-none opacity-50 bg-primary' : ''} `}>
            Apply Coupon
          </button>
        </div>
        <Link onClick={buttonAlert} disabled={isCartEmpty} className={`bg-primary flex p-4 justify-center items-center text-white w-full font-medium hover:bg-green-500 transition duration-300 ${isCartEmpty ? 'pointer-events-none opacity-50' : ''}`}>Complete Order</Link>
      </div>
    </div>
  );
};

export default Sidebar;
