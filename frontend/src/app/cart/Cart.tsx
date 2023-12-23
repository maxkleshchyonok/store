import React, { useEffect, useState } from 'react'
import { Navbar } from '../navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Cart, CartPageItem, OrderItem } from './types/types';
import { getOrder, getOrderProduct } from './store/cart.actions';
import OrderItemComponent from '../orderItem/OrderItem';
import './style.scss'
import { Typography } from '@mui/material';


export const CartPage = () => {
  const [products, setProducts] = useState<CartPageItem[]>([]);

  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart
  )

  useEffect(() => {
    const receiveOrder = async () => {
      try {
        const order = await dispatch<any>(getOrder());
        const orderItems: CartPageItem[] = [];
        await Promise.all(
          order.payload.items.map(async (item: OrderItem) => {
            const orderProduct = await dispatch<any>(getOrderProduct(item.productId));
            const cartItem: CartPageItem = {
              name: orderProduct.payload.name,
              description: orderProduct.payload.description,
              images: orderProduct.payload.images,
              quantity: item.quantity,
              price: item.price
            };
            orderItems.push(cartItem);
          })
        );
        setProducts(orderItems);
      } catch (error) {
        throw new Error('Error in loading cart');
      }
    };
    receiveOrder();
  }, []);


  return (
    <div>
      <Navbar />
      <Typography variant="h2" component="h2" sx={{padding: '3% 0 0 3%'}}>
        Your cart: 
      </Typography>
      <div className='content'>
        {products.map(el => {
          return (
            <OrderItemComponent
              name={el.name}
              description={el.description}
              images={el.images}
              quantity={el.quantity}
              price={el.price}
            />
          )
        })}
      </div>
    </div>
  )
}