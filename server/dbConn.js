import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_CONN, DB_NAME } = process.env;

const isDev = true;

mongoose.connect(
    DB_CONN,
    {
        dbName: DB_NAME, 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }
);

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));

export { conn };
