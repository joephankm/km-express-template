import { createApp } from '#/app';

// CONSTANTS
import env from '#configs/env';

const app = createApp();

app.listen(env.PORT, () => {
  console.info(`Server is running on port ${env.PORT}!`);
});
