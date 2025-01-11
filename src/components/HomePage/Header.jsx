import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export default function Header() {
  const { cartItems } = useContext(CartContext);
  const length = cartItems.length;
  return (
    <>
      <div className="amazon-header">
        <div className="amazon-header-left-section">
          <NavLink to="/" className="header-link">
            <img
              className="amazon-logo"
              src="./images/amazon-logo-white.png"
              alt="Amazon Logo"
            />
            <img
              className="amazon-mobile-logo"
              src="./images/amazon-mobile-logo-white.png"
              alt="Amazon Mobile Logo"
            />
          </NavLink>
        </div>

        <div className="amazon-header-middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img
              className="search-icon"
              src="./images/icons/search-icon.png"
              alt="Search Icon"
            />
          </button>
        </div>

        <div className="amazon-header-right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="returns-text">Returns</span>
            <span className="orders-text">& Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img
              className="cart-icon"
              src="./images/icons/cart-icon.png"
              alt="Cart Icon"
            />
            <div className="cart-quantity js-cart-quantity">{length}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
