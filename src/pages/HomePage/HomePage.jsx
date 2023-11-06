import "./HomePage.scss";
export default function HomePage() {
  return (
    <main className="main">
      <section className="deal-of-the-week">
        <div className="deal-of-the-week__container">
          <ul className="deal-of-the-week__list">
            <li className="deal-of-the-week__item">Product 1</li>
            <li className="deal-of-the-week__item">Product 2</li>
            <li className="deal-of-the-week__item">Product 3</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
