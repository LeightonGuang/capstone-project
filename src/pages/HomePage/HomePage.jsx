import { useEffect } from "react";
import DealOfTheWeek from "../../components/DealOfTheWeek/DealOfTheWeek";
import HeroCard from "../../components/HeroCard/HeroCard";
import "./HomePage.scss";
import scrollToTop from "../../utils/scrollToTop";

export default function HomePage() {
  useEffect(() => {
    scrollToTop();
  },[]);

  return (
    <main className="main">
      <div className="main__container">
        <HeroCard />
        <DealOfTheWeek />
      </div>
    </main>
  );
}
