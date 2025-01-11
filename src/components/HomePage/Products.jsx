import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export default function Products() {
  const { products, addToCart, cartItems } = useContext(CartContext);

  const getPrice = (price) => (price / 100).toFixed(2);

  const allProducts = products.map((product) => {
    const [quantityM, setQuantityM] = useState(1);

    const handleQuantityChange = (event) => {
      setQuantityM(Number(event.target.value));
    };

    const isInCart = cartItems.some((item) => item.id === product.id);

    return (
      <div key={product.id} className="product-container">
        <Link to={`${product.id}`}>
          <div className="link-container">
            <div className="product-image-container">
              <img className="product-image" src={product.image} />
            </div>
          </div>
        </Link>
        <div className="product-name limit-text-to-2-lines">{product.name}</div>

        <div className="product-rating-container">
          <img
            className="product-rating-stars"
            src={`./public/images/ratings/rating-${
              product.rating.stars * 10
            }.png`}
          />
          <div className="product-rating-count link-primary">
            {product.rating.count}
          </div>
        </div>

        <div className="product-price">${getPrice(product.priceCents)}</div>

        <div className="product-quantity-container">
          <select value={quantityM} onChange={handleQuantityChange}>
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="product-spacer"></div>

        {isInCart && (
          <div className="added-to-cart">
            <img src="./public/images/icons/checkmark.png" alt="checkmark" />
            Added
          </div>
        )}

        <button
          className="add-to-cart-button button-primary js-add-to-cart"
          onClick={() => addToCart(product.id, quantityM)}
        >
          Add to Cart
        </button>
      </div>
    );
  });

  return (
    <div className="main">
      <div className="products-grid js-products-grid">{allProducts}</div>
    </div>
  );
}
