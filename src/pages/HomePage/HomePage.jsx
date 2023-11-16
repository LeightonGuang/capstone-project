import DealOfTheWeek from "../../components/DealOfTheWeek/DealOfTheWeek";
import HeroCard from "../../components/HeroCard/HeroCard";
import "./HomePage.scss";
export default function HomePage() {
  return (
    <main className="main">
      <div className="main__container">
        <HeroCard />
        <DealOfTheWeek />
      </div>
    </main>
  );
}
