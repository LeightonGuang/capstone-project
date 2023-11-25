import "./DealOfTheWeek.scss";
import DealCard from "../DealCard/DealCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DealOfTheWeek() {
  const [deals, setDeals] = useState();

  const getDeals = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/product`
    );

    const dealArray = [];
    const indexs = [];

    while (indexs.length < 6) {
      const randomNumber = Math.floor(Math.random() * data.length);

      if (indexs.indexOf(randomNumber) === -1) {
        indexs.push(randomNumber);
      }
    }

    indexs.forEach((i) => {
      dealArray.push(data[i]);
    });

    setDeals(dealArray);
  };

  useEffect(() => {
    getDeals();
  }, []);

  if (!deals) {
    return <p>Loading...</p>;
  }

  return (
    <section className="deal-of-the-week">
      <div className="deal-of-the-week__container">
        <h2 className="deal-of-the-week__subtitle">Deal of the week</h2>
        <div className="deal-of-the-week__list">
          {deals.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="deal-of-the-week__link"
            >
              <DealCard
                img={product.product_img_url}
                productName={product.product_name}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
