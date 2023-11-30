import "./ProductListPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import scrollToTop from "../../utils/scrollToTop";

export default function ProductListPage() {
  const [productList, setProductList] = useState([]);
  const { category } = useParams();

  const getProductsInCategory = async () => {
    try {
      if (category) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/product/category/${category}`
        );
        setProductList(data);
      } else if (!category) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/product`
        );
        setProductList(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    scrollToTop();
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
                <Link
                  to={`/products/${product.id}`}
                  className="product-card__link"
                >
                  <img
                    src={product.product_img_url}
                    alt=""
                    className="product-card__img"
                  />

                  <h3 className="product-card__name">{product.product_name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
