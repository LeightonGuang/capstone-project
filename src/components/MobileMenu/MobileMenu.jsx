import "./MobileMenu.scss";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/icons/home-outline.svg";
import categoryIcon from "../../assets/icons/category-outline.svg";
import heartIcon from "../../assets/icons/heart-outline.svg";
import profileIcon from "../../assets/icons/profile-outline.svg";
import { useState } from "react";

export default function MobileMenu() {
  const [isHomeActive, setIsHomeActive] = useState(true);
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const [isSavedActive, setIsSavedActive] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);

  const handleMenuClick = (event) => {
    console.log(event.currentTarget.id);
    setIsHomeActive(false);
    setIsCategoryActive(false);
    setIsSavedActive(false);
    setIsProfileActive(false);
    if (event.currentTarget.id === "home-link") setIsHomeActive(true);
    if (event.currentTarget.id === "category-link") setIsCategoryActive(true);
    if (event.currentTarget.id === "saved-link") setIsSavedActive(true);
    if (event.currentTarget.id === "profile-link") setIsProfileActive(true);
  };
  return (
    <div className="mobile-menu">
      <nav className="mobile-menu__nav">
        <ul className="mobile-menu__list">
          <Link
            to={"/"}
            className="mobile-menu__link"
            id="home-link"
            onClick={handleMenuClick}
          >
            <li
              className={`mobile-menu__img-container ${
                isHomeActive && "mobile-menu__img-container--selected"
              }`}
            >
              <img
                src={homeIcon}
                alt="Home Icon Created by Besticons from Noun Project"
                className="mobile-menu__home-icon"
              />
              {/* Home */}
            </li>
          </Link>
          <Link
            to={"/category"}
            className="mobile-menu__link"
            id="category-link"
            onClick={handleMenuClick}
          >
            <li
              className={`mobile-menu__img-container ${
                isCategoryActive && "mobile-menu__img-container--selected"
              }`}
            >
              <img
                src={categoryIcon}
                alt="Category Icon Created by Besticons from Noun Project"
                className="mobile-menu__category-icon"
              />
              {/* Category */}
            </li>
          </Link>

          <Link
            to={"/saved"}
            className="mobile-menu__link"
            id="saved-link"
            onClick={handleMenuClick}
          >
            <li
              className={`mobile-menu__img-container ${
                isSavedActive && "mobile-menu__img-container--selected"
              }`}
            >
              <img
                src={heartIcon}
                alt="Saved Icon Created by Besticons from Noun Project"
                className="mobile-menu__heart-icon"
              />
              {/* Saved */}
            </li>
          </Link>
          <Link
            to={"/profile"}
            className="mobile-menu__link"
            id="profile-link"
            onClick={handleMenuClick}
          >
            <li
              className={`mobile-menu__img-container ${
                isProfileActive && "mobile-menu__img-container--selected"
              }`}
            >
              <img
                src={profileIcon}
                alt="Profile Icon Created by Besticons from Noun Project"
                className="mobile-menu__profile-icon"
              />
              {/* Profile */}
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
