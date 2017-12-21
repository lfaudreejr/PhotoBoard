import * as express from 'express'
import * as path from 'path'
// import * as favicon from 'serve-favicon'
import * as logger from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
/**
 * Api Route handlers
 */
import apiRouter from './routes/'
/** 
 * Debug logging
*/
require('debug')('photoboard:server')
/** 
 * Instantiate the Express app
*/
const app: express.Application = express();
/**
 * View engine
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
/**
 * Middleware setup
 */
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Router
 */
app.use('/api', apiRouter);
/**
 * 404 Handler
 */
app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
  const err = new Error('Not Found');
  err.message = '404';
  next(err);
});

/**
 * Error Handler
 */
app.use(function(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(Number(err.message) || 500).json(err);
});

export default app