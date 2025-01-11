import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export default function Product() {
  const params = useParams();
  const { getProduct, addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(() => {
    try {
      const savedReviews = localStorage.getItem(`reviews-${params.id}`);
      return savedReviews ? JSON.parse(savedReviews) : [];
    } catch (error) {
      console.error("Error loading reviews:", error);
      return [];
    }
  });
  const [review, setReview] = useState("");
  const [quantityM, setQuantityM] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const fetchedProduct = getProduct(params.id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [params.id, getProduct]);

  useEffect(() => {
    localStorage.setItem(`reviews-${params.id}`, JSON.stringify(reviews));
  }, [reviews, params.id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (review.trim()) {
      const newReviews = [...reviews, review];
      setReviews(newReviews);
      setReview("");
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0 && value <= 10) {
      setQuantityM(value);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Error loading product.</div>;

  return (
    <div className="product-details-container">
      <div className="product-information">
        <div className="single-image-container">
          <img className="single-image" src={product.image} />
        </div>
        <div className="single-details">
          <div className="product-name">{product.name}</div>
          <div className="product-rating-container">
            <img
              className="product-rating-stars"
              src={`./public/images/ratings/rating-${
                product.rating.stars * 10
              }.png`}
            />
            <div className="product-rating-count">{product.rating.count}</div>
          </div>
          <div className="product-price">
            ${(product.priceCents / 100).toFixed(2)}
          </div>
          <div className="product-description">{product.description}</div>
          <div className="product-quantity">
            Quantity:
            <select value={quantityM} onChange={handleQuantityChange}>
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            className="add-to-cart-button button-primary js-add-to-cart"
            onClick={() => addToCart(product.id, quantityM)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="reviews-section">
        <span>Reviews ({reviews.length})</span>
        <ul className="reviews-list">
          {reviews.map((review, index) => (
            <li key={index} className="review-item">
              {review}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmitReview} className="review-input-container">
          <input
            type="text"
            placeholder="Write a review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}
