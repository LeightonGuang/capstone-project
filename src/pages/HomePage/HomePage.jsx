import DealOfTheWeek from "../../components/DealOfTheWeek/DealOfTheWeek";
import "./HomePage.scss";
export default function HomePage() {
  return (
    <main className="main">
      <div className="main__container">
        <DealOfTheWeek />
      </div>
    </main>
  );
}
