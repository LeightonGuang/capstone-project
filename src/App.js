import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import ProductPage from "./pages/ProductPage/ProductPage";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import FavouritePage from "./pages/FavouritePage/FavouritePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/favourite" element={<FavouritePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
        <MobileMenu />
      </BrowserRouter>
    </div>
  );
}
