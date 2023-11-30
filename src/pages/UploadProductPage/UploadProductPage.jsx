import "./UploadProductPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import scrollToTop from "../../utils/scrollToTop";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";

export default function UploadProductPage() {
  const [profile, setProfile] = useState(null);
  const [failedAuth, setFailedAuth] = useState(true);
  const [allProducts, setAllProducts] = useState(null);
  const [allShops, setAllShops] = useState(null);
  const [formData, setFormData] = useState({
    product: "new product",
  });
  const [newProductId, setNewProductId] = useState(null);
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem("authToken");

  const handleFormChange = async (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createNewProduct = async (event) => {
    try {
      // create new product and get the new product id
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/product`,
        {
          product_name: formData.product_name,
          product_img_url: formData.product_img_url,
          brand: formData.brand,
          model: formData.model,
          category: formData.category,
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setNewProductId(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.product === "new product") {
      try {
        await createNewProduct();
      } catch (error) {
        console.error(error);
        return;
      }
    } else if (formData.product !== "new product") {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/shop/listing`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            body: {
              product_id:
                formData.product === "new product"
                  ? newProductId
                  : formData.product,
              shop_id: profile.id,
              currency: formData.currency,
              price: formData.price,
            },
          }
        );

        navigate(`/products/${event.target.product.value}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/shop/profile`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setProfile(data);
      setFailedAuth(false);
    } catch (error) {
      setFailedAuth(true);
    }
  };

  const getAllProducts = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/product`
    );
    setAllProducts(data);
  };

  const getAllShops = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/shop`
    );
    setAllShops(data);
  };

  useEffect(() => {
    scrollToTop();
    getProfile();
    getAllProducts();
    getAllShops();
  }, []);

  useEffect(() => {
    const createListing = async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/api/shop/listing`,
          {
            product_id:
              formData.product === "new product"
                ? newProductId
                : formData.product,
            shop_id: profile.id,
            currency: formData.currency,
            price: formData.price,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        navigate(`/products/${newProductId}`);
      } catch (error) {
        console.error(error);
      }
    };

    createListing();
  }, [newProductId]);

  if (!(allProducts && allShops)) {
    return <p>Loading...</p>;
  }

  if (failedAuth) {
    navigate("/");
  }

  return (
    <div className="list-product">
      <div className="list-product__container">
        <article className="list-product__card">
          <h2 className="list-product__title">List Product</h2>

          <form
            onSubmit={handleSubmit}
            onChange={handleFormChange}
            className="upload-form"
          >
            <label>Select a product</label>
            <select name="product" className="upload-form__product">
              <option value="new product">Add New Product</option>
              {allProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.product_name}
                </option>
              ))}
            </select>
            {formData.product === "new product" ? (
              <>
                <div className="upload-form__divider" />

                <Input
                  type={"text"}
                  name={"product_name"}
                  label={"Product Name"}
                />
                <Input
                  type={"text"}
                  name={"product_img_url"}
                  label={"Product Image Url"}
                />
                <Input type={"text"} name={"brand"} label={"Brand"} />
                <Input type={"text"} name={"model"} label={"Model"} />
                <Input type={"text"} name={"category"} label={"Category"} />
                <Input
                  type={"text"}
                  name={"description"}
                  label={"Description"}
                />

                <div className="upload-form__divider" />
              </>
            ) : (
              <></>
            )}
            <Input type="text" name={"currency"} label={"Currency"} />
            <Input type={"number"} name={"price"} label={"Price"} />
            <input type="submit" value={"Upload"} />
          </form>
        </article>
      </div>
    </div>
  );
}
