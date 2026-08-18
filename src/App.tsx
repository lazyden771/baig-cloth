import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { ProductDetail } from "./pages/ProductDetail";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="about" element={<About />} />
        {/* Without this, an unknown URL renders a completely blank page. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
