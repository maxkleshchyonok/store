import React, { useEffect, useState } from 'react'
import { Navbar } from '../navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Product } from '../product/types/types';
import ProductCard from '../product/ProductCard';

export const Cart = () => {
  const [order, setOrder] = useState({items: []});
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state: RootState) => state.product
  )

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await dispatch<any>(getOrder());
        setOrder(res.payload);
      } catch (error) {
        throw new Error('Error in loading cart');
      }
    }
    
  }, []);

  return (
    <div>
      <Navbar />
      {order.items.map((item: Product) => (
        <ProductCard
          productId={item.id}
          key={item.id}
          name={item.name}
          price={item.price}
          description={item.description}
          imageUrl={item.images[0]}
        />
      ))}
    </div>
  )
}
