import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartOpen : false,
  setIsCartOpen : () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

const addCartItem = (cartItems, productToAdd) => {
  //find if existing cart items contains product to add
  const existingCartItems = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  //if cart item found do this
  if (existingCartItems){
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id 
        ? { ...cartItem , quantity: cartItem.quantity + 1}
        :cartItem
        );
  }
  //new product this is the case.
  return [...cartItems, { ...productToAdd , quantity: 1}]
}
const removeCartItem = (cartItems, cartItemToRemove) => {
  //find cart item to remove
  const existingCartItems = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)
  //if quantity is equal to 1, if it is less than 1 remove item from the cart
  if(existingCartItems.quantity === 1){
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }
  //return back cartitems with reduced quanttity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setcartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setcartTotal(newCartTotal);
  }, [cartItems]);
  
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }
  const clearItemFromCart = (cartItemToRemove) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove));
  }

  const value = {
    isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
