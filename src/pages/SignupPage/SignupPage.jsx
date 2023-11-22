import "./SignupPage.scss";
import axios from "axios";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignupPage() {
  const [errror, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/auth/register`,
        {
          name: event.target.name.value,
          country: event.target.country.value,
          address: event.target.address.value,
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );

      navigate("/login");
    } catch (error) {
      console.error(error);
      // setError(error.response.data);
    }
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <article className="signup__card">
          <h2 className="signup__title">Register as a Business</h2>
          <form onSubmit={handleSubmit} className="signup__form">
            <Input type="text" name="name" label="Name" />
            <Input type="text" name="country" label="Country" />
            <Input type="text" name="address" label="Address" />
            <Input type="email" name="email" label="email" />
            <Input type="email" name="confirm_email" label="Confirm Email" />
            <p>This email does not match the email above</p>
            <Input type="password" name="password" label="Password" />
            <Input
              type="password"
              name="confirm_password"
              label="Confirm Password"
            />
            <p>This password does not match the password above</p>

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
