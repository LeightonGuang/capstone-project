import axios from "axios";

const token = sessionStorage.getItem("authToken");

const response = await axios.get(
  `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/auth/profile`,
  {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  }
);

const { status, data } = response;
