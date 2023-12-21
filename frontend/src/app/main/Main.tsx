import React from 'react'
import ProductCard from '../card/Card';
import './style.scss'
import { Navbar } from '../navbar/Navbar';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 9.99,
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    imageUrl: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    price: 19.99,
    imageUrl: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 14.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
  },
  {
    id: 4,
    name: 'Product 4',
    price: 24.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
  },
  {
    id: 5,
    name: 'Product 5',
    price: 7.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
  },
  {
    id: 6,
    name: 'Product 6',
    price: 12.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
  },
  {
    id: 7,
    name: 'Product 7',
    price: 29.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://www.imagesfromtexas.com/images/xl/Late-March-Bluebonnet-Sunset-331-7.jpg',
  },
  {
    id: 8,
    name: 'Product 8',
    price: 17.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://www.imagesfromtexas.com/images/xl/Late-March-Bluebonnet-Sunset-331-7.jpg',
  },
  {
    id: 9,
    name: 'Product 9',
    price: 10.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://www.imagesfromtexas.com/images/xl/Late-March-Bluebonnet-Sunset-331-7.jpg',
  },
  {
    id: 10,
    name: 'Product 10',
    price: 49.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=80',
  },
  {
    id: 11,
    name: 'Product 11',
    price: 79.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=80',
  },
];

export const Main = () => {
  return (
    <div>
      <Navbar />
      <h2>Main</h2>
      <div className='products'>
        {products.map((product) => (
          <ProductCard
            productId={product.id}
            key={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            imageUrl={product.imageUrl}
          />
        ))}
        </div>
      </div>
      )
}

export default Main;