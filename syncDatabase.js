import { syncDatabase } from "./models/index.js";


syncDatabase().then(() => {
  console.log('Database synced');
  process.exit(0);
}).catch((err) => {
  console.error('Error syncing database:', err);
  process.exit(1);
});
