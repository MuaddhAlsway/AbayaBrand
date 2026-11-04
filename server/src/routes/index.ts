import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import customerRoutes from "../modules/customers/customer.routes";
import productRoutes from "../modules/products/product.routes";
import categoryRoutes from "../modules/categories/category.routes";
import inventoryRoutes from "../modules/inventory/inventory.routes";
import addressRoutes from "../modules/addresses/address.routes";
import wishlistRoutes from "../modules/wishlist/wishlist.routes";
import cartRoutes from "../modules/cart/cart.routes";
import checkoutRoutes from "../modules/checkout/checkout.routes";
import orderRoutes from "../modules/orders/order.routes";
import paymentRoutes from "../modules/payments/payment.routes";
import shippingRoutes from "../modules/shipping/shipping.routes";
import reviewRoutes from "../modules/reviews/review.routes";
import newsletterRoutes from "../modules/newsletter/newsletter.routes";
import adminRoutes from "../modules/admin/admin.routes";
import mediaRoutes from "../modules/media/media.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/customers", customerRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/addresses", addressRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/cart", cartRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
router.use("/shipping", shippingRoutes);
router.use("/reviews", reviewRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/admin", adminRoutes);
router.use("/media", mediaRoutes);

export default router;
