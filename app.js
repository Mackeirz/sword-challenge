const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./config/env');

const tasksRouter = require('./api/routes/tasks.router');
const authRouter = require('./api/routes/auth.router');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/tasks', tasksRouter);
app.use('/api/auth', authRouter);

require('./amqp')(app);

module.exports = app;