
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import AnnouncementBar from "./components/layout/AnnouncementBar";
import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";

// Temporary placeholder for unfinished pages.
function PagePlaceholder({ title }: { title: string }) {
  return (
    <main style={{ minHeight: "65vh", padding: "100px 5%" }}>
      <h1>{title}</h1>
      <p>Coming soon — ABAYA Collection</p>
    </main>
  );
}

function StoreLayout() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Outlet />
      {/* Footer will be added next */}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<PagePlaceholder title="Shop All" />} />
          <Route path="new-arrivals" element={<PagePlaceholder title="New Arrivals" />} />
          <Route path="collections" element={<PagePlaceholder title="Collections" />} />
          <Route path="product/:slug" element={<PagePlaceholder title="Product Details" />} />
          <Route path="our-story" element={<PagePlaceholder title="Our Story" />} />
          <Route path="wishlist" element={<PagePlaceholder title="Wishlist" />} />
          <Route path="cart" element={<PagePlaceholder title="Shopping Bag" />} />
          <Route path="checkout" element={<PagePlaceholder title="Checkout" />} />
          <Route path="account" element={<PagePlaceholder title="My Account" />} />
          <Route path="*" element={<PagePlaceholder title="Page Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
