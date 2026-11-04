
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import AnnouncementBar from "./components/layout/AnnouncementBar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AccountLayout from "./components/account/AccountLayout";
import AccountDashboard from "./pages/account/AccountDashboard";
import Profile from "./pages/account/Profile";
import Addresses from "./pages/account/Addresses";
import Orders from "./pages/account/Orders";
import OrderDetails from "./pages/account/OrderDetails";
import AccountWishlist from "./pages/account/Wishlist";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CartDrawer from "./components/cart/CartDrawer";
import ScrollToTop from "./components/layout/ScrollToTop";
import Collections from "./pages/Collections";
import NewArrivals from "./pages/NewArrivals";
import ProductDetails from "./pages/ProductDetails";
import OurStory from "./pages/OurStory";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard, { AdminModule, AdminProducts } from "./pages/AdminDashboard";

function StoreLayout() {
  return (
    <>
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <Outlet />
      <Footer />
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="sign-in/*" element={<SignIn />} />
          <Route path="sign-up/*" element={<SignUp />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route
            path="account"
            element={
              <ProtectedRoute>
                <AccountLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AccountDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderId" element={<OrderDetails />} />
            <Route path="wishlist" element={<AccountWishlist />} />
          </Route>
          <Route path="new-arrivals" element={<NewArrivals />} />
          <Route path="collections" element={<Collections />} />
          <Route path="product/:slug" element={<ProductDetails />} />
          <Route path="our-story" element={<OurStory />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="inventory" element={<AdminModule title="Inventory" kicker="ABAYA / OPERATIONS" description="Track stock levels, variants, and low-stock products from one workspace." />} />
          <Route path="orders" element={<AdminModule title="Orders" kicker="ABAYA / FULFILLMENT" description="Review customer orders, payment status, and fulfillment progress." />} />
          <Route path="customers" element={<AdminModule title="Customers" kicker="ABAYA / RELATIONSHIPS" description="Manage customer profiles and account activity synced from Clerk and MongoDB." />} />
          <Route path="settings" element={<AdminModule title="Settings" kicker="ABAYA / CONFIGURATION" description="Configure store operations, shipping, and administrator preferences." />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
