import { createContext, useEffect, useState } from "react";
import { deliveryOptions } from "../data/deliveryOptions";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://supersimplebackend.dev/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productId, quantityM) => {
    const matchingProduct = cartItems.find(
      (item) => item.productId === productId
    );
    if (matchingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          productId,
          quantity: quantityM,
          deliveryOptionId: "1",
        },
      ]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const updateDeliveryOption = (productId, deliveryOptionId) => {
    setCartItems(
      cartItems.map((item) =>
        item.productId === productId ? { ...item, deliveryOptionId } : item
      )
    );
  };

  const getProduct = (productId) => {
    return products.find((product) => product.id === productId);
  };

  const getDeliveryOption = (deliveryOptionId) => {
    return deliveryOptions.find((option) => option.id === deliveryOptionId);
  };

  const formatCurrency = (cents) => (cents / 100).toFixed(2);

  const cartTotal = cartItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        products,
        isLoading,
        error,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateDeliveryOption,
        getProduct,
        getDeliveryOption,
        formatCurrency,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
