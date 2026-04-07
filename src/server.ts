import { createApp } from '#/app';

// CORE
import { serverLogger } from '#/logging';

// CONSTANTS
import env from '#configs/env';

const app = createApp();

app.listen(env.PORT, () => {
  serverLogger.info(`🚀 App is running on port ${env.PORT}!`);
});
