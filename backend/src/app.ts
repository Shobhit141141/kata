import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { CONSTANTS } from './config/constants.js';
import registerRoutes from './routes/index.js';

dotenv.config();

const app = express();

const corsOptions = {
  origin: CONSTANTS.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(express.json());

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (_, res) => {
  res.send('Welcome to the API');
});

registerRoutes(app);
export default app;
