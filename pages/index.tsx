import Grid from '@mui/material/Grid';
import type { GetStaticProps } from 'next';
import ProductItem from '../components/ProductItem';

type HomeProps = {
  products: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }[];
};

const Home: React.FC<HomeProps> = ({ products }: HomeProps) => {
  return (
    <Grid container sx={{ justifyContent: 'center', py: 2 }} spacing={2}>
      {products.map((item) => (
        <Grid item key={item.id}>
          <ProductItem {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
};
