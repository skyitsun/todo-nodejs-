require('dotenv').config()

import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import apiRoute from './routes/api'
import path from 'path'

// const { sequelize } = require('./models');

var app = express();
// sequelize.sync();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
  })
  
  // error handler
  app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {}
  return res.status(err.status || 500)
    .json(res.locals.error)
  })

module.exports = app;
