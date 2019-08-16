import * as dotenv from 'dotenv';

import app from './app';

dotenv.config();

const { PORT } = process.env;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('☠️ Process terminated');
    process.exit();
  });
});
