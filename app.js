import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
// import path from 'path';
import dotenv from 'dotenv';
// import webpack from 'webpack';
// import webpackMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
import expressValidator from 'express-validator';
import database from './models';
import routes from './routes';

dotenv.config();

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 9000;

app.use(logger('dev'));
// app.use('/assets', express.static(path.join(__dirname, './../client/assets')));
// app.use('/api-docs', express.static(path.join(__dirname, './../api-docs')));

// if (process.env.NODE_ENV !== 'development') {
//   app.use(express.static(path.join(__dirname, 'app.js')));
// }

// if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
//   const webpackConfig = require('../webpack.config.dev'); // eslint-disable-line
  // const compiler = webpack(webpackConfig);
//   app.use(webpackMiddleware(compiler, {
//     hot: true,
//     publicPath: webpackConfig.output.publicPath,
//     noInfo: true
//   }));
//   app.use(webpackHotMiddleware(compiler));
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressValidator());

routes(router);
app.use('/api/v1', router);
app.get('/', (req, res)=> {
  res.send('hello there this is working');
})



database.sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, (err) => {
      if (!err) {
        console.log(`listening on port localhost:${PORT}`);
      }
    });
    console.log('Datbase Connection established');
  })
  .catch((err) => {
    console.log('Could not establish a database connection', err);
  });


export default app;
