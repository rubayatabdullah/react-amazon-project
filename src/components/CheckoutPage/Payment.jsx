import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { deliveryOptions } from "../../data/deliveryOptions";

export default function Payment() {
  const { cartItems, products, isLoading } = useContext(CartContext);

  // Initialize totals
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  const formatCurrency = (cents) => {
    return (cents / 100).toFixed(2);
  };

  const getDeliveryOption = (deliveryOptionId) => {
    return (
      deliveryOptions.find((option) => option.id === deliveryOptionId) ||
      deliveryOptions[0]
    );
  };

  // Calculate totals only if products are loaded
  if (!isLoading && products.length > 0) {
    cartItems.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);

      if (product && product.priceCents) {
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
      }
    });
  }

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = Math.round(totalBeforeTaxCents * 0.1);
  const totalCents = totalBeforeTaxCents + taxCents;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="payment-summary-title">Order Summary</div>

      <div className="payment-summary-row">
        <div>Items ({cartItems.length}):</div>
        <div className="payment-summary-money">
          ${formatCurrency(productPriceCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">
          ${formatCurrency(shippingPriceCents)}
        </div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">
          ${formatCurrency(totalBeforeTaxCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">${formatCurrency(taxCents)}</div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">
          ${formatCurrency(totalCents)}
        </div>
      </div>
      <Link to="orders">
        <button
          className="place-order-button button-primary
      js-place-order"
        >
          Place your order
        </button>
      </Link>
    </>
  );
}
