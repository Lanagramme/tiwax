import createError from 'http-errors';
import express from 'express';
import { join } from 'path';
import cors from 'cors';
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

// const app = express();
const __dirname = process.cwd()

// create app
export default express()

  // view engine setup
  .set('views', join(__dirname, 'views'))

  // .use(logger('dev'))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  // .use(cookieParser())
  .use(express.static(join(__dirname, 'public')))

  // .use('/', indexRouter);
  // .use('/users', usersRouter);
  .use('/', indexRouter)
  .use('/users', usersRouter)

  // catch 404 and forward to error handler
  .use(function(req, res, next) { next(createError(404)) })

  // error handler
  .use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    res.json({success: 0, message: err.message})
  });

