import 'dotenv/config';
import history, { config } from '../src/storage/history.js';

(async () => {
  const storage = history.getStorage();
  // config.document_id = "dev"

  const data = await storage.get();
  console.log('size:', Object.keys(data).length);
  // console.log('Data:', data);
})();
