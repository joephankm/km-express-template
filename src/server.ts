import { app } from './app';

const PORT = 8112;

app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}!`);
});
