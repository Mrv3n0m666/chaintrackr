import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import privateRoutes from './routes/private';

// Swagger setup
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerUiServe, swaggerUiSetup } from './swagger';

dotenv.config();
const app = express();

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Chaintrackr API',
    version: '1.0.0',
    description: 'API for managing user addresses and related functionalities',
  },
  servers: [
    {
      url: 'http://localhost:3001/api',  // Server URL
    },
  ],
};

// Swagger options
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],  // Scans route and controller files
};

const swaggerSpec = swaggerJSDoc(options);

// Swagger UI setup
app.use('/api-docs', swaggerUiServe, swaggerUiSetup);

app.use(cors());
app.use(express.json());

app.use('/api', privateRoutes);

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
