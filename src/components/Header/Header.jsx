import "./Header.scss";
import logo from "../../assets/images/storedex_logo.svg";
import searchIcon from "../../assets/icons/search_FILL0_wght400_GRAD0_opsz24.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo-container">
        <img src={logo} alt="logo" className="header__logo" />
        <h1 className="header__title">Storedex</h1>
      </div>
      <form className="header__form">
        <input type="text" className="header__search-input" />
        <button type="submit" className="header__search-button">
          <img
            src={searchIcon}
            alt="search icon"
            className="header__search-icon"
          />
        </button>
      </form>
      <div className="header__divider" />
    </header>
  );
}
