import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export default function CheckoutHeader() {
  const { cartItems } = useContext(CartContext);
  const length = cartItems.length;
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <NavLink to="/">
              <img
                className="amazon-logo"
                src="./images/amazon-logo.png"
                alt="Amazon Logo"
              />
              <img
                className="amazon-mobile-logo"
                src="./images/amazon-mobile-logo.png"
                alt="Amazon Mobile Logo"
              />
            </NavLink>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <NavLink className="return-to-home-link" to="/">
              {length} items
            </NavLink>
            )
          </div>

          <div className="checkout-header-right-section">
            <img
              src="/images/icons/checkout-lock-icon.png"
              alt="Checkout Lock Icon"
            />
          </div>
        </div>
      </div>
    </>
  );
}
