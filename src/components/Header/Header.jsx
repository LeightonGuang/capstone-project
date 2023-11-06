import "./Header.scss";
import logo from "../../assets/images/storedex_logo.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo-container">
        <img src={logo} alt="logo" className="header__logo" />
        <h1 className="header__title">Storedex</h1>
      </div>
      <div className="header__divider" />
    </header>
  );
}
