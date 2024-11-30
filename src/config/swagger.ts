import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Patient Management System API',
            version: '1.0.0',
            description: 'API for managing patient data, including validation and record management.',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}/api`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/docs/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
