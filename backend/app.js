const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookieParser());

// Import all routes
const auth = require('./routes/auth');
const user = require('./routes/user');
const doctor = require('./routes/doctor');
const ticket = require('./routes/ticket');

app.use('/api/medpro', auth);
app.use('/api/medpro', user);
app.use('/api/medpro', doctor);
app.use('/api/medpro', ticket);

//
// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;