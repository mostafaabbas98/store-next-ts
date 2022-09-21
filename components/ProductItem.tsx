import {
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  Rating,
  Typography,
  ListItem,
  ListItemText,
} from '@mui/material';

import ShoppingBagSharp from '@mui/icons-material/ShoppingBagSharp';

import { useCart } from '../context/CartContext';

type HomeProps = {
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
};

const ProductItem = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}: HomeProps) => {
  const { addItemToCart } = useCart();

  return (
    <Card
      sx={{
        width: 350,
        height: 380,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={image}
        sx={{ objectFit: 'contain' }}
        alt={title}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{ fontSize: '16px', fontWeight: 700 }}
        >
          {title}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle2"
          component="span"
          color="gray"
        >
          {category}
        </Typography>

        <List component="ul" sx={{ pt: '0.1rem' }}>
          <ListItem>
            <ListItemText>${price}</ListItemText>
          </ListItem>
          <ListItem sx={{ mt: '-10px' }}>
            <Rating
              name="read-only"
              size="small"
              value={rating.rate}
              readOnly
            />
          </ListItem>
          <ListItem
            onClick={() =>
              addItemToCart({
                id,
                title,
                category,
                description,
                image,
                price,
                rating,
                quantity: 1,
              })
            }
          >
            <Button variant="contained" size="small">
              <ShoppingBagSharp />
              <ListItemText primary="Add To Cart" />
            </Button>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
