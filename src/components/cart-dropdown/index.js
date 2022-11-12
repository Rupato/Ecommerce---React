import React from 'react';
import Button from '../button-component';
import CartItem from '../cart-item'
import './index.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/checkout')
  }
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {
          cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))
        }
      </div>
      <Button onClick={checkoutHandler}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default Index