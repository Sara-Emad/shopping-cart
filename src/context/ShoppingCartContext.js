import { createContext, useContext, useState, useEffect } from "react";
import ShoppingCart from "../components/ShoppingCart";

const ShoppingCartContext = createContext({});

// (parse) convert json file to js object
const initialCartItem = localStorage.getItem("shopping-cart")
  ? JSON.parse(localStorage.getItem("shopping-cart"))
  : [];

const ShoppingCartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItem, setCartItem] = useState(initialCartItem);

  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cartItem));
  }, [cartItem]);

  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };

  // cartQuantity  بوصل من خلاله لعدد العناصر الي جوه كارت
  const cartQuantity = cartItem.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  // getItemQuantity ترجع عدد item  المخزنة داخل ال cart اللى هيا اللي state
  const getItemQuantity = (id) => {
    return cartItem.find((item) => item.id === id)?.quantity || 0;
  };
  // function  لاضافة العنصر الي السلة و اعدل علي ال state(setCartItem)
  const increaseCartQuantity = (id) => {
    setCartItem((currItem) => {
      if (currItem.find((item) => item.id === id) == null) {
        return [...currItem, { id, quantity: 1 }];
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decreaseCartQuantity = (id) => {
    setCartItem((currItem) => {
      if (currItem.find((item) => item.id === id) == null) {
        return currItem.filter((item) => item.id !== id);
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeItemFromCart = (id) => {
    setCartItem((currItem) => currItem.filter((item) => item.id !== id));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItem,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeItemFromCart,
        closeCart,
        openCart,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
// custom hook (useShoppingCart) help to call context api
export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
