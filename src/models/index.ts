import sequelize from '../config/database';
import setupAssociations from './associations';

const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        setupAssociations();
        await sequelize.sync();
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

export default initDB;
