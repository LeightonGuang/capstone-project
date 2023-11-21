import "./SignupPage.scss";
import logo from "../../assets/images/storedex_logo.svg";

export default function SignupPage() {
  return (
    <div className="signup">
      <div className="signup__container">
        <article className="signup__card">
          <h2 className="signup__title">Register as a Business</h2>
          <img src={logo} alt="" className="signup__logo" />
          <form action="" className="signup__form">
            <label htmlFor="">Business Name: </label>
            <input type="text" />
            <label htmlFor="">Adress: </label>
            <input type="text" className="signup__address" />
            <label htmlFor="">Email: </label>
            <input type="email" />
            <label htmlFor="">Confirm Email: </label>
            <input type="email" />
            <label htmlFor="">Password: </label>
            <input type="password" />
            <label htmlFor="">Confirm Password: </label>
            <input type="password" />
            <div className="signup__actions">
              <input type="button" value="Cancel" />
              <input type="submit" value="Sign Up" />
            </div>
          </form>
        </article>
      </div>
    </div>
  );
}
