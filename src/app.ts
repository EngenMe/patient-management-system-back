import express from 'express';
import dotenv from 'dotenv';
import patientRoutes from './routes/patient.routes';
import doctorRoutes from './routes/doctor.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(errorHandler);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/patient', patientRoutes);
app.use('/api', doctorRoutes);

export default app;
