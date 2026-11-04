import app from "./app";
import { env, validateEnv } from "./config/env";
import { connectDatabase } from "./config/database";
import { logger } from "./utils/logger";

async function bootstrap(): Promise<void> {
  validateEnv();
  await connectDatabase();
  app.listen(env.port, () => {
    logger.info(`Server listening on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  logger.error(error);
  process.exit(1);
});