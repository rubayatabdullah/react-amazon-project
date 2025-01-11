import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/CheckoutPage/Cart";
import Checkout from "./components/CheckoutPage/Checkout";
import Order from "./components/HomePage/Orders/Order";
import Product from "./components/HomePage/Product";
import Products from "./components/HomePage/Products";
import Layout from "./components/Layout";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Products />} />
            <Route path=":id" element={<Product />} />
            <Route path="checkout" element={<Checkout />}>
              <Route index element={<Cart />} />
              <Route path="orders" element={<Order />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
