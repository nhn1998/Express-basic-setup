import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  PORT: process.env.PORT,
  database: process.env.DATABASE_URL,
};
