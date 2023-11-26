import axios from "axios";
import "./ManageListingPage.scss";
import { useEffect, useState } from "react";
import scrollToTop from "../../utils/scrollToTop";

export default function ManageListingPage() {
  const [listing, setListing] = useState();

  const getListing = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/shop/listing`
      );
      console.log(data);
      setListing(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    scrollToTop();
    getListing();
  }, []);

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="manage-listing">
      <div className="manage-listing__card">
        <h2 className="manage-listing__title">Manage Listing</h2>
        <ul></ul>
      </div>
    </div>
  );
}
