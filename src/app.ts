import express from 'express';
import dotenv from 'dotenv';
import patientRoutes from './routes/patient.routes';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/patient', patientRoutes);

export default app;
