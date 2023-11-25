import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import FavouritePage from "./pages/FavouritePage/FavouritePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import UploadProductPage from "./pages/UploadProductPage/UploadProductPage";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route
            path="/products/category/:category"
            element={<ProductListPage />}
          />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/favourite" element={<FavouritePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/shop/:id" element={<ShopPage />} />
          <Route path="/uploadProduct" element={<UploadProductPage />} />
        </Routes>
        <MobileMenu />
      </BrowserRouter>
    </div>
  );
}
