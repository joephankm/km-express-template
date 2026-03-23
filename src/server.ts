import { app } from './app';

// CONSTANTS
import env from './configs/env';

app.listen(env.PORT, () => {
  console.info(`Server is running on port ${env.PORT}!`);
});
