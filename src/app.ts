import express from 'express';

// CONSTANTS
import env from 'constants/env';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(env.PORT, () => {
  console.info(`App listening on port ${env.PORT}`);
});
