import "./ShopListingCard.scss";

export default function ShopListingCard() {
  return (
    <article className="shop-card">
      <div>
        <h3 className="shop-card__name">Shop name</h3>
        <span className="shop-card__address">Address</span>
      </div>

      <div className="shop-card__price">$100</div>
    </article>
  );
}
