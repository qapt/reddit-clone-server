import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import routes from './api/v1';

import { notFound, errorHandlerDev } from './middleware/errorHandler';

const app: Express = express();

// Middleware
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(routes);

// Error handlers, must be last middleware
/// catch 404 and forward to error handler
app.use(notFound);

// development error handler
app.use(errorHandlerDev);

export default app;
