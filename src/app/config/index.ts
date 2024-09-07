import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_round_salt: process.env.BYCRYPT_ROUND_SALT,
  default_password: process.env.DEFAULT_PASS
};