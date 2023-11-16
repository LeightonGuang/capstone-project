import "./DealCard.scss";

export default function DealCard() {
  return (
    <li className="product-card">
      <div className="product-card__container">
        <img
          src="https://www.price.com.hk/space/product/603000/603200_qeuyf7_0.jpg"
          alt="product"
          className="product-card__image"
        />
        <div className="product-card__divider" />
        <div className="product-card__info">
          <span>Intel 14900k</span>
          <span>price $5000</span>
        </div>
      </div>
    </li>
  );
}
