import "./DealOfTheWeek.scss";
import ProductCard from "../ProductCard/ProductCard";

export default function DealOfTheWeek() {
  return (
    <section className="deal-of-the-week">
      <div className="deal-of-the-week__container">
        <h2 className="deal-of-the-week__subtitle">Deal of the week</h2>
        <ul className="deal-of-the-week__list">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ul>
      </div>
    </section>
  );
}
