import React, {createContext, useState, useEffect} from 'react';

export const CartContext = createContext()


const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);


  useEffect(() => {
    const savedData = localStorage.getItem('cart');
    if(savedData) {
      setCart(JSON.parse(savedData));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  useEffect(() => {
    const total = cart.reduce((acc, currentItem) => {
      return acc + currentItem.price * currentItem.amount;
    }, 0);
    const discountedTotal = total * (discountApplied ? 0.85 : 1); 
    setTotal(discountedTotal);
  }, [cart, discountApplied]);


  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((acc, currentItem) => 
      {
        return acc + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart])

  
  const addToCart = (product, id)=>{
    const newItem = {...product, amount: 1}
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 }
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };


  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };


  const clearCart = () => {
    setCart([]);
  };


  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => 
      item.id === id);
    addToCart(cartItem, id);
  };


  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return {...item, amount: cartItem.amount - 1};
        } else {
          return item;
        }
      });
      setCart(newCart);
    } 
    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  };


  const setDiscountAppliedInCartContext = (value) => {
    setDiscountApplied(value);
  };



  
  return (
  <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, setTotal, itemAmount, total, discountApplied, setDiscountApplied:setDiscountAppliedInCartContext }}>{children}</CartContext.Provider>
  )
};

export default CartProvider;
