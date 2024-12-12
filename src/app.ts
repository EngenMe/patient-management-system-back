import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';

import patientValidateRoutes from './routes/patientValidate.routes';
import doctorRoutes from './routes/doctors.routes';
import idTypeRoutes from './routes/idTypes.routes';
import patientRoutes from './routes/patients.routes';
import verifyOtpRoutes from './routes/verifyOtp.routes';
import createNewAppointmentRoutes from './routes/appointments.routes';
import adminRoutes from './routes/admins.routes';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(errorHandler);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/patient', patientValidateRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/id-types', idTypeRoutes);
app.use('/api/verify-otp', verifyOtpRoutes);
app.use('/api/appointments', createNewAppointmentRoutes);
app.use('/api/admins', adminRoutes);

export default app;
