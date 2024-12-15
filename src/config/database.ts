import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// If SSL with a CA certificate
// const sslOptions = {
//     ssl: {
//         require: true,
//         rejectUnauthorized: true, // Set to false if you do not have a CA certificate
//         // ca: fs.readFileSync('path/to/rds-combined-ca-bundle.pem').toString(), // Uncomment if using CA
//     },
// };

const sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // True if CA certificate
            // ca: fs.readFileSync('path/to/rds-combined-ca-bundle.pem').toString()
        },
    },
});

export default sequelize;
