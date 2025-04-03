import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes/convertRoutes.js';
import authRoutes from './routes/authRoutes.js';
import statsRoutes from './routes/datafilesRoutes.js'

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/convert', routes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes)

export default app;
