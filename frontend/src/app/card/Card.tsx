import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, TextField, Typography, makeStyles } from '@mui/material';
import { ProductCardProps } from './types/card.type';



const ProductCard: React.FC<ProductCardProps> = ({ productId, imageUrl, description, price, name }) => {

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleByClick = () => {
    const data = {
      userId: localStorage.getItem('userId'),
      totalPrice: 0,
      items: {
        productId: productId,
        quantity: 0,
        price: 0
      }
    }
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value, 10);
    setQuantity(parsedValue);
  };

  return (
    <Card sx={{ maxWidth: 345, paddingBottom: '25%' }}>
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
        <Typography>
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <TextField
        type='number'
        defaultValue={1}
        InputProps={{inputProps: {min: 1, max: 100, step: 1}}}
        onChange={handleQuantityChange}
        ></TextField>
        <Button variant='contained'>Buy</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
