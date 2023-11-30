import "./SignupPage.scss";
import axios from "axios";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import scrollToTop from "../../utils/scrollToTop";

export default function SignupPage() {
  const [errror, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/auth/register`,
        {
          shop_logo_url: event.target.shop_logo_url.value,
          shop_name: event.target.name.value,
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

  useEffect(() => {
    scrollToTop();
  });

  return (
    <div className="signup">
      <div className="signup__container">
        <article className="signup__card">
          <h2 className="signup__title">Register as a Business</h2>
          <form onSubmit={handleSubmit} className="signup__form">
            <Input
              type="text"
              name="shop_logo_url"
              label="Upload shop logo url (optional)"
            />
            <Input type="text" name="name" label="Name" />
            <Input type="text" name="country" label="Country" />
            <Input type="text" name="address" label="Postcode" />
            <Input type="email" name="email" label="email" />
            <Input type="password" name="password" label="Password" />

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
