import { useContext } from "react";
import { ProductsContext } from '../../contexts/products.context';
import ProductCard from '../../components/product-card';
import './index.scss';

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return(
    <div className="products-card-container">
      {products.map((product) => {
        return(
          <ProductCard product={product}  />
        )
      })}
    </div>
  )
}


export default Shop;