import React from 'react';
import './index.scss';
import Button from '../button-component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const Index = ({ product }) => {
  const { name, price, imageUrl , id} = product;
  const { addItemToCart } = useContext(CartContext)
  const addProductToCart = () => addItemToCart(product);
  return (
    <div className='product-card' kry={id}>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType={'inverted'} onClick={addProductToCart}>Add to cart</Button>
    </div>
  )
}

export default Index