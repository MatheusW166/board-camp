import pkg from 'pg';
const { Pool } = pkg;
import { config } from "dotenv";
config();

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default connection;
