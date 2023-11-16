import "./DealOfTheWeek.scss";
import DealCard from "../DealCard/DealCard";
import { Link } from "react-router-dom";

export default function DealOfTheWeek() {
  return (
    <section className="deal-of-the-week">
      <div className="deal-of-the-week__container">
        <h2 className="deal-of-the-week__subtitle">Deal of the week</h2>
        <div className="deal-of-the-week__list">
          <Link to={"/products/:id"} className="deal-of-the-week__link">
            <DealCard
              img={
                "https://www.price.com.hk/space/product/563000/563906_lztgc4_4.jpg"
              }
              productName={"Intel i5 13600k"}
              price={"$200"}
            />
          </Link>
          <Link to={"/products/:id"} className="deal-of-the-week__link">
            <DealCard
              img={
                "https://www.price.com.hk/space/product/563000/563902_i6vyiq_4.jpg"
              }
              productName={"Intel i7 13700k"}
              price={"$300"}
            />
          </Link>
          <Link to={"/products/:id"} className="deal-of-the-week__link">
            <DealCard
              img={
                "https://www.price.com.hk/space/product/563000/563899_kz5f5x_4.jpg"
              }
              productName={"Intel i9 13900k"}
              price={"$600"}
            />
          </Link>
          <Link to={"/products/:id"} className="deal-of-the-week__link">
            <DealCard
              img={
                "https://www.price.com.hk/space/product/603000/603195_4zyg2i_4.jpg"
              }
              productName={"Intel i5 14600k"}
              price={"$275"}
            />
          </Link>
          <Link to={"/products/:id"} className="deal-of-the-week__link">
            <DealCard
              img={
                "https://www.price.com.hk/space/product/603000/603197_buvjzj_4.png"
              }
              productName={"Intel i7 14700k"}
              price={"$450"}
            />
          </Link>
          <Link to={"/products/:id"} className="deal-of-the-week__link">
            <DealCard
              img={
                "https://www.price.com.hk/space/product/603000/603200_qeuyf7_0.jpg"
              }
              productName={"Intel i9 14900k"}
              price={"$700"}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
