import { createContext, ReactNode, useContext, useState } from 'react';

type CartProviderProps = {
  children: ReactNode;
};

type CartItem = {
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
  quantity: number;
};

type CartContext = {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  addItemToCart: (item: CartItem) => void;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  totalCartPrice: number;
  cartItems: CartItem[];
};

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const totalCartPrice = cartItems.reduce(
    (total, item) => total + (item?.price || 0) * item.quantity,
    0
  );
  function addItemToCart(item: CartItem) {
    setCartItems((currentItems) => {
      if (currentItems.find((curitem) => curitem.id === item.id)) {
        return currentItems.map((itemx) => {
          if (itemx.id == item.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...currentItems, { ...item }];
      }
    });
  }
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.id == id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id == id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        openCart,
        closeCart,
        getItemQuantity,
        addItemToCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        totalCartPrice,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
