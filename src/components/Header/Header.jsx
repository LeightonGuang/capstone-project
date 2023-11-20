import "./Header.scss";
import logo from "../../assets/images/storedex_logo.svg";
import searchIcon from "../../assets/icons/search-icon.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__card">cod
          <div className="header__card-front">
            <div className="header__card-front-container">
              <Link to={"/"} className="header__logo-container">
                <img src={logo} alt="logo" className="header__logo" />
                <h1 className="header__title">Storedex</h1>
              </Link>
              <button className="header__search-btn">
                <img
                  src={searchIcon}
                  alt="search icon"
                  className="header__search-icon"
                />
              </button>
            </div>
          </div>

          <div className="header__card-back">
            <input type="text" className="header__searchbar" />
          </div>
        </div>
      </div>
    </header>
  );
}
