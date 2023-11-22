import "./SignupPage.scss";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="signup">
      <div className="signup__container">
        <article className="signup__card">
          <h2 className="signup__title">Register as a Business</h2>
          <form action="" className="signup__form">
            <Input type="text" name="business_name" label="Business Name" />
            <Input type="text" name="address" label="Address" />
            <Input type="text" name="email" label="email" />
            <Input type="text" name="confirm_email" label="Confirm Email" />
            <Input type="text" name="password" label="Password" />
            <Input
              type="text"
              name="confirm_password"
              label="Confirm Password"
            />
            <div className="signup__actions">
              <Link to={"/profile"}>Cancel</Link>
              <input type="submit" value="Sign Up" />
            </div>
          </form>
        </article>
      </div>
    </div>
  );
}
