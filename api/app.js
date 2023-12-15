const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080','https://nisrine-azmar-vinci.github.io/catio/','https://nisrine-azmar-vinci.github.io']
};

const usersRouter = require('./routes/users');
const scoresRouter = require('./routes/scores')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/users',usersRouter);
app.use('/scores', scoresRouter);

module.exports = app;
