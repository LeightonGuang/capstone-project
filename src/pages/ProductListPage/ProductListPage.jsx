import "./ProductListPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ProductListPage() {
  const [productList, setProductList] = useState([]);
  const { category } = useParams();

  const getProductsInCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/product/category/${category}`
      );
      setProductList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductsInCategory();
  }, []);

  return (
    <div className="product-list">
      <div className="product-list__container">
        <article className="product-list__card">
          <h2 className="product-list__title">{category}</h2>
          <ul className="product-list__list">
            {productList.map((product) => (
              <li key={product.id} className="product-card">
                <Link className="product-card__link">
                  <h3>{product.name}</h3>
                  <img
                    src={product.img_url}
                    alt=""
                    className="product-card__img"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
