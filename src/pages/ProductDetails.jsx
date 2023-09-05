import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';


const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const product = products.find((item)=> {
    return item.id === parseInt(id);
  });
  if (!product) {
    return <section className='h-screen flex justify-center items-center text-[30px]'>This product has not been added to the store yet.</section>
  }
  const { title, price, description, image } = product;

  return (
    <section className='pt-32 pb-12 lg:py-32 flex items-center'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img className='max-w-[150px] md:max-w-[200px] lg:max-w-sm mt-30 lg:mt-20' src={image} alt="" />
          </div>
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[20px] lg:text-[26px] md:text-[22px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{title}</h1>
            <div className='text-[20px] lg:text-[26px] md:text-[22px] text-red-500 font-medium mb-6'>$ {price}</div>
            <p className='mb-8'>{description}</p>
            <button onClick={()=>addToCart(product, product.id)} className='bg-primary mb-10 py-4 px-8 text-white lg:mb-0 hover:bg-red-500 transition duration-300'>Add to cart</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
