import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, TextField, Typography, makeStyles } from '@mui/material';
import { ProductCardProps } from './types/card.type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CartItem } from '../cart/types/types';
import { createOrder } from '../cart/store/cart.actions';


const ProductCard: React.FC<ProductCardProps> = ({ productId, imageUrl, description, price, name, amount }) => {

  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart
  );

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);

  const handleByClick = async () => {
    const data: CartItem = {
      userId: sessionStorage.getItem('userId'),
      items: {
        productId: +productId,
        quantity: quantity,
        price: totalPrice
      }
    }
    await dispatch<any>(createOrder(data))
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value, 10);
    setQuantity(parsedValue);
    setTotalPrice(parsedValue * price);
  };

  return (
    <Card sx={{ maxWidth: 345, minHeight: '52vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imageUrl}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <div>
          <Typography>
            {price}
          </Typography>
          <Typography>
            In stock: {amount}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <TextField
          type='number'
          defaultValue={1}
          InputProps={{ inputProps: { min: 1, max: 100, step: 1 } }}
          onChange={handleQuantityChange}
        ></TextField>
        <Button onClick={handleByClick} variant='contained'>Buy</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
