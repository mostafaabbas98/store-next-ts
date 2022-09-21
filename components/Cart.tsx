import {
  Box,
  Divider,
  List,
  ListItem,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';

import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    cartQuantity,
    totalCartPrice,
  } = useCart();

  return (
    <Box sx={{ width: 300 }} role="presentation">
      <Typography component="h1" variant="h5" sx={{ p: 2, fontWeight: 'bold' }}>
        Your Cart
      </Typography>

      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <Card sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography
                    component="h3"
                    variant="caption"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {item.title}
                  </Typography>
                  <Typography component="h6" variant="subtitle2">
                    ${item.price}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    aria-label="Remove"
                    onClick={() => decreaseCartQuantity(item.id)}
                  >
                    <RemoveCircleOutlinedIcon />
                  </IconButton>
                  <span aria-label="item quantity">
                    {getItemQuantity(item.id)}
                  </span>
                  <IconButton
                    aria-label="Add"
                    onClick={() => increaseCartQuantity(item.id)}
                  >
                    <AddCircleOutlinedIcon />
                  </IconButton>
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 100, objectFit: 'contain' }}
                image={item.image}
                alt={item.title}
              />
            </Card>
          </ListItem>
        ))}
        {cartItems.length > 0 && (
          <Box sx={{ pt: 2 }}>
            <Divider />
            <Typography component="h3" variant="subtitle1" sx={{ p: 1 }}>
              Total Quantity: {cartQuantity}
            </Typography>
            <Typography component="h3" variant="subtitle1" sx={{ p: 1 }}>
              Total Price: ${totalCartPrice.toFixed(2)}
            </Typography>
          </Box>
        )}
      </List>
    </Box>
  );
};

export default Cart;
