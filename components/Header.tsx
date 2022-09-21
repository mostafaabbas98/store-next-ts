import Cart from './Cart';
import { useCart } from '../context/CartContext';
import {
  Badge,
  BadgeProps,
  Drawer,
  styled,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: 15,
    border: `1px solid #FFF`,
    padding: '0 2px',
  },
}));

const Header = () => {
  const { cartQuantity, isCartOpen, openCart, closeCart } = useCart();

  return (
    <Box sx={{ flexGrow: 1, mb: 10 }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h4"
            component="a"
            sx={{
              color: 'whitesmoke',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            Store
          </Typography>

          <IconButton
            aria-label="cart"
            onClick={openCart}
            sx={{ color: 'whitesmoke' }}
          >
            <StyledBadge badgeContent={cartQuantity} color="primary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>

          <Drawer anchor="right" open={isCartOpen} onClose={closeCart}>
            <Cart />
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
