import app from "./app";
import { env, validateEnv } from "./config/env";
import { connectDatabase } from "./config/database";
import { logger } from "./utils/logger";
import { Product } from "./modules/products/product.model";
import { seedProducts } from "./seedProducts";
import { Admin } from "./modules/admin/admin.model";
import { Media } from "./modules/media/media.model";

async function bootstrap(): Promise<void> {
  validateEnv();
  await connectDatabase();
  for (const email of env.adminEmailAllowlist) {
    await Admin.updateOne({ email }, { $setOnInsert: { email, role: "admin", active: true } }, { upsert: true });
  }
  if (await Product.countDocuments() === 0) {
    await seedProducts();
  }
  const products = await Product.find({}, { image: 1 }).lean();
  for (const product of products) if (product.image) await Media.updateOne({ url: product.image }, { $setOnInsert: { name: product.image.split("/").pop() ?? "product-image", url: product.image, mimeType: "image/*", size: 0 } }, { upsert: true });
  app.listen(env.port, () => {
    logger.info(`Server listening on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  logger.error(error);
  process.exit(1);
});
