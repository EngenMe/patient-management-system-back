import express from 'express';
import dotenv from 'dotenv';
import patientValidateRoutes from './routes/patientValidate.routes';
import doctorRoutes from './routes/doctors.routes';
import idTypeRoutes from './routes/idTypes.routes';
import patientRoutes from './routes/patients.routes';
import verifyOtpRoute from './routes/verifyOtp.routes';
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
app.use('/api/patient', patientValidateRoutes);
app.use('/api', doctorRoutes, idTypeRoutes, patientRoutes, verifyOtpRoute);

export default app;
