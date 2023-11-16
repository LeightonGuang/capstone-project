import "./DealCard.scss";

export default function DealCard({ img, productName, price }) {
  return (
    <li className="deal-card">
      <div className="deal-card__container">
        <img src={img} alt="product" className="deal-card__image" />

        <div className="deal-card__info">
          <span className="deal-card__product-name">{productName}</span>
          <span className="deal-card__price">{price}</span>
        </div>
      </div>
    </li>
  );
}
