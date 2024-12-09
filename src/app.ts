import express from 'express';
import dotenv from 'dotenv';
import patientValidateRoutes from './routes/patientValidate.routes';
import doctorRoutes from './routes/doctors.routes';
import idTypeRoutes from './routes/idTypes.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import patientRoutes from './routes/patients.routes';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(errorHandler);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/patient', patientValidateRoutes);
app.use('/api', doctorRoutes, idTypeRoutes, patientRoutes);

export default app;
