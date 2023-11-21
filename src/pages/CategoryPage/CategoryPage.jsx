import { useEffect, useState } from "react";
import "./CategoryPage.scss";
import scrollToTop from "../../utils/scrollToTop";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/product/category`
      );
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    scrollToTop();
    getAllCategories();
  }, []);

  return (
    <div className="category">
      <div className="category__container">
        <article className="category__card">
          <h2 className="category__title">Categories</h2>
          <ul className="category__list">
            {categories.map((category, index) => (
              <li key={index} className="category__item-card">
                <Link to={`/`} className="category__link">
                  {category.category}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
