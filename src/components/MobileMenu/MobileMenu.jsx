import "./MobileMenu.scss";
import { NavLink } from "react-router-dom";
import homeIcon from "../../assets/icons/home-outline.svg";
import categoryIcon from "../../assets/icons/category-outline.svg";
import heartIcon from "../../assets/icons/heart-outline.svg";
import profileIcon from "../../assets/icons/profile-outline.svg";

export default function MobileMenu() {
  return (
    <div className="mobile-menu">
      <nav className="mobile-menu__nav">
        <ul className="mobile-menu__list">
          <NavLink to={"/"} className="mobile-menu__link">
            <li className="mobile-menu__img-container">
              <img
                src={homeIcon}
                alt="Home Icon Created by Besticons from Noun Project"
                className="mobile-menu__home-icon"
              />
              {/* Home */}
            </li>
          </NavLink>
          <NavLink to={"/category"} className="mobile-menu__link">
            <li className="mobile-menu__img-container">
              <img
                src={categoryIcon}
                alt="Category Icon Created by Besticons from Noun Project"
                className="mobile-menu__category-icon"
              />
              {/* Category */}
            </li>
          </NavLink>

          <NavLink to={"/favourite"} className="mobile-menu__link">
            <li className="mobile-menu__img-container">
              <img
                src={heartIcon}
                alt="Saved Icon Created by Besticons from Noun Project"
                className="mobile-menu__heart-icon"
              />
              {/* Saved */}
            </li>
          </NavLink>
          <NavLink to={"/profile"} className="mobile-menu__link">
            <li className="mobile-menu__img-container">
              <img
                src={profileIcon}
                alt="Profile Icon Created by Besticons from Noun Project"
                className="mobile-menu__profile-icon"
              />
              {/* Profile */}
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}
