import "./ShopListingCard.scss";

export default function ShopListingCard({
  imgURL,
  shopName,
  address,
  currency,
  price,
}) {
  return (
    <article className="shop-card">
      <img src={imgURL} alt="shop logo" className="shop-card__logo" />
      <div>
        <h3 className="shop-card__name">{shopName}</h3>
        <span className="shop-card__address">{address}</span>
        <div className="shop-card__price">{currency + " " + price}</div>
      </div>
    </article>
  );
}
