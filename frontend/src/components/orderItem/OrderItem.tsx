import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { CartPageItem } from '../../app/cart/types/types';

export default function OrderItemComponent ({name, description, images, quantity, price}: CartPageItem) {
  return (
    <Card sx={{ width: 320, margin: '0 3% 3% 0' }}>
      <div>
        <Typography level="title-lg">{name}</Typography>
        <Typography level="body-sm">{description}</Typography>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={images[0]}
          loading="lazy"
          alt="Item logo"
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {price}
          </Typography>
          <Typography level="body-xs">Amount:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {quantity}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}