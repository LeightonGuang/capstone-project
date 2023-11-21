import "./HeroCard.scss";
import { Link } from "react-router-dom";

export default function HeroCard() {
  return (
    <section className="hero">
      <div className="hero__container">
        <h2 className="hero__title">
          Find the cheapest shop for what you want!
        </h2>
        <Link to="/products">Browse Now</Link>
      </div>
    </section>
  );
}
