import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});
const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Database connected!');
    }
    catch (error) {
        console.error('Error connecting to the database: ', error);
        process.exit(1);
    }
};
export { pool, connectDB };
