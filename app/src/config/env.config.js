import dotenv from 'dotenv';

dotenv.config();

export const env = {
    server: {
        port: process.env.SERVER_PORT,
        host: process.env.SERVER_HOST 
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiration: process.env.EXPIRATION
    }
};
