import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Cart, CartPageItem, OrderFromResponse, OrderItem } from './types/types';
import { confirmOrder, getOrder, getOrderProduct } from './store/cart.actions';
import OrderItemComponent from '../../components/orderItem/OrderItem';
import './style.scss'
import { Button, Typography } from '@mui/material';


export const CartPage = () => {
  const [products, setProducts] = useState<CartPageItem[]>([]);
  const [order, setOrder] = useState<OrderFromResponse>();

  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart
  )

  useEffect(() => {
    const receiveOrder = async () => {
      try {
        const order = await dispatch<any>(getOrder());
        if (!order) {
          return;
        }
        setOrder(order.payload);
        const orderItems: CartPageItem[] = [];
        await Promise.all(
          order.payload.items.map(async (item: OrderItem) => {
            const orderProduct = await dispatch<any>(getOrderProduct(item.productId));
            const cartItem: CartPageItem = {
              name: orderProduct.payload.name,
              description: orderProduct.payload.description,
              images: orderProduct.payload.images,
              quantity: item.quantity,
              price: item.price,
              amount: orderProduct.payload.amount,
            };
            orderItems.push(cartItem);
          })
        );
        setProducts(orderItems);
      } catch (error) {
        console.log(error)
      }
    };
    receiveOrder();
  }, []);


  const handleSubmit = async () => {
    if (order) {
      console.log(order)
      await dispatch<any>(confirmOrder(order.id)).then(() => {
        alert('You order successfully confirmed. Reload the page');
      });
    }
  }


  return (
    <div>
      <Navbar />
      <Typography variant="h2" component="h2" sx={{ padding: '3% 0 0 3%' }}>
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
              amount={el.amount}
            />
          )
        })}
      </div>
      {products.length > 0 && (
        <Button
          variant="contained"
          color="success"
          sx={{ minWidth: '10vw', height: '8vh', marginLeft: '4%' }}
          onClick={handleSubmit}
        >
          Confirm order
        </Button>
      )}
      {products.length == 0 && (
        <Typography variant="h4" component="h4" sx={{paddingLeft: '4%'}}>
          No items yet.
        </Typography>
      )}
    </div>
  )
}