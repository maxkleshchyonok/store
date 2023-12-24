import React, { useEffect, useState } from 'react'
import ProductCard from '../product/ProductCard';
import './style.scss'
import { Navbar } from '../../components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getProduct } from '../product/store/product.action';
import { Product } from '../product/types/types';
import { Typography } from '@mui/material';

const Main = () => {

  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state: RootState) => state.product
  )

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await dispatch<any>(getProduct());
        setProducts(res.payload);
      } catch (error) {
        throw new Error('Error in loading products')
      }
    }
    getProducts();
  }, []);



  return (
    <div>
      <Navbar />
      <Typography variant="h2" component="h2" sx={{ padding: '3% 0 0 3%' }}>
        Main Catalog:
      </Typography>
      <div className='products'>
        {products.map((product: Product) => (
          <ProductCard
            productId={product.id}
            key={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            imageUrl={product.images[0]}
            amount={product.amount}
          />
        ))}
      </div>
    </div>
  )
}

export default Main;