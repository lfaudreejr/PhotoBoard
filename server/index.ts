import * as express from 'express'
import * as path from 'path'
import * as favicon from 'serve-favicon'
import * as logger from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as helmet from 'helmet'
/**
 * Api Route handlers
 */
import apiRouter from './router/'

/** 
 * Instantiate the Express app
*/
const app: express.Application = express();

/**
 * Middleware setup
 */
if (process.env.NODE_ENV === 'development') {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
}
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')));
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
}));
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../client/dist/')));
}
/**
 * Router
 */
app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}
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