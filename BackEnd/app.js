const express = require('express');
const app = express();
const routes = require('./routes/convertRoutes');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/convert', routes);
app.use('/api/auth', authRoutes);

module.exports = app;
