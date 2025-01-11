import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions";
import Payment from "./Payment";

export default function Cart() {
  const { cartItems, products, removeFromCart, updateDeliveryOption } =
    useContext(CartContext);
  const getPrice = (price) => (price / 100).toFixed(2);

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    return deliveryOptions.map((Option) => {
      const today = dayjs();
      const deliveryDate = today.add(Option.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        Option.priceCents === 0 ? "FREE" : `$${getPrice(Option.priceCents)} -`;

      return (
        <div
          key={Option.id}
          className="delivery-option js-delivery-option"
          data-product-id={matchingProduct.id}
          data-delivery-option-id={Option.id}
        >
          <input
            type="radio"
            checked={Option.id === cartItem.deliveryOptionId}
            className="delivery-option-input"
            name={`delivery-option-${matchingProduct.id}`}
            value={Option.id}
            onChange={() =>
              handleDeliveryOptionChange(matchingProduct.id, Option.id)
            }
          />
          <div>
            <div className="delivery-option-date">{dateString}</div>
            <div className="delivery-option-price">{priceString} Shipping</div>
          </div>
        </div>
      );
    });
  }

  function handleDeliveryOptionChange(productId, deliveryOptionId) {
    updateDeliveryOption(productId, deliveryOptionId);
  }

  let cartSummaryHTML = [];
  cartSummaryHTML = cartItems.map((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct = products.find((product) => product.id === productId);
    if (!matchingProduct) {
      return null; // or handle the error appropriately
    }
    const today = dayjs();
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    return (
      <div
        key={matchingProduct.id}
        className={`cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}`}
      >
        <div className="delivery-date">Delivery date: {dateString}</div>

        <div className="cart-item-details-grid">
          <img className="product-image" src={`./${matchingProduct.image}`} />

          <div className="cart-item-details">
            <div className="product-name">{matchingProduct.name}</div>
            <div className="product-price">
              ${getPrice(matchingProduct.priceCents)}
            </div>
            <div
              className={`product-quantity js-product-quantity-${matchingProduct.id}`}
            >
              <span>
                Quantity:{" "}
                <span className="quantity-label">{cartItem.quantity}</span>
              </span>
              <span className="update-quantity-link link-primary">Update</span>
              <span
                className={`delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}`}
                data-product-id={matchingProduct.id}
                onClick={() => removeFromCart(cartItem.productId)}
              >
                Delete
              </span>
            </div>
          </div>

          <div className="delivery-options">
            <div className="delivery-options-title">
              Choose a delivery option:
            </div>
            {deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="checkout-main">
      <div className="checkout-grid">
        <div className="order-summary js-order-summary">{cartSummaryHTML}</div>
        <div className="payment-summary">
          <Payment />
        </div>
      </div>
    </div>
  );
}
