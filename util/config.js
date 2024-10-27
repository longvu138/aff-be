import dotenv from 'dotenv';
dotenv.config();

export const DB_CONFIG = {
    DB_USERNAME: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_DIALECT: 'mysql', // hoặc 'postgres', 'sqlite', v.v.
    DB_LOGGING: !!process.env.DB_LOGGING || false,
    DB_TIMEZONE: '+07:00',
}

export const APP_CONFIG = {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT || 5001,
    CORS: process.env.CORS || '*',
    ENV: process.env.PROD || '',
}
