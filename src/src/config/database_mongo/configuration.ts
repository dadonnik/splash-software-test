import { registerAs } from '@nestjs/config';
export default registerAs('database_mongo', () => ({
  username: process.env.MONGO_ROOT_USERNAME,
  password: process.env.MONGO_ROOT_PASSWORD,
  database: process.env.MONGO_DB_NAME,
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  params: process.env.MONGO_DB_PARAMS,
}));
