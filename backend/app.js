const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookieParser());

// Import all routes
const auth = require('./routes/auth');
const record = require('./routes/record');
const bookschedule = require('./routes/book');
// const order = require('./routes/order');

app.use('/api/medpro', auth);
app.use('/api/medpro', record);
app.use('/api/medpro', bookschedule);
// app.use('/api/medpro', order);

//
// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;