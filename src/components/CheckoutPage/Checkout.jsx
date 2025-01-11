import { Outlet } from "react-router-dom";
import CheckoutHeader from "./CheckoutHeader";

export default function Checkout() {
  return (
    <>
      <CheckoutHeader />
      <Outlet />
    </>
  );
}
