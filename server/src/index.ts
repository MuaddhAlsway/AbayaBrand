import app from "./app";
import { env, validateEnv } from "./config/env";
import { connectDatabase } from "./config/database";
import { logger } from "./utils/logger";
import { Product } from "./modules/products/product.model";
import { seedProducts } from "./seedProducts";

async function bootstrap(): Promise<void> {
  validateEnv();
  await connectDatabase();
  if (await Product.countDocuments() === 0) {
    await seedProducts();
  }
  app.listen(env.port, () => {
    logger.info(`Server listening on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  logger.error(error);
  process.exit(1);
});
