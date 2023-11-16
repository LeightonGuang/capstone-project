import "./DealOfTheWeek.scss";
import DealCard from "../DealCard/DealCard";
import { Link } from "react-router-dom";

export default function DealOfTheWeek() {
  return (
    <section className="deal-of-the-week">
      <div className="deal-of-the-week__container">
        <h2 className="deal-of-the-week__subtitle">Deal of the week</h2>
        <ul className="deal-of-the-week__list">
          <Link to={"/products/:id"}>
            <DealCard />
          </Link>
          <DealCard />
          <DealCard />
          <DealCard />
          <DealCard />
          <DealCard />
        </ul>
      </div>
    </section>
  );
}
