import "./LoginPage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import axios from "axios";
import scrollToTop from "../../utils/scrollToTop";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/auth/login`,
        {
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );

      sessionStorage.setItem("authToken", data.token);
      console.log(data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
  };

  useEffect(() => {
    scrollToTop();
  });

  return (
    <div className="login">
      <div className="login__container">
        <article className="login__card">
          <h2 className="login__title">Log in to your business</h2>

          <form onSubmit={handleSubmit} className="login__form">
            <Input type="email" name="email" label="Email" />
            <Input type="password" name="password" label="Password" />

            <button type="submit" className="login__button">
              Log In
            </button>
          </form>
        </article>
      </div>
    </div>
  );
}
