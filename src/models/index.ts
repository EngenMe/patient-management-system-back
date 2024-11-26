import sequelize from '../config/database';

const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        await sequelize.sync();
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

export default initDB;
