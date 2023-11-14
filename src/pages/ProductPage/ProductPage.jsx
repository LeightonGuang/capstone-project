import "./ProductPage.scss";

export default function ProductPage() {
  return (
    <div className="product-page">
      <div className="product-page__container">
        <section className="product-info">
          <article className="product-info__img">
            <img
              src="https://placehold.co/500x500"
              alt="placeholder img"
              className="product-info__img--main"
            />
          </article>

          <article className="product-info__description">
            <div className="product-info__container">
              <h2 className="product-info__name">Intel I9 14900k</h2>
              <span>Intel</span>
              <p>release date</p>
            </div>
          </article>
        </section>

        <article className="product-listing">
          
        </article>
      </div>
    </div>
  );
}
