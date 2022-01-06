import './bootstrap';

import express from 'express';
import expressip from 'express-ip';

import * as Sentry from '@sentry/node';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import Youch from 'youch';

import sentryConfig from './config/sentry';
import routes from './routes';
// import uploadImg from './config/uploads/uploadImg';
// import uploadFile from './config/uploads/uploadFile';
import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(helmet());
    this.server.use(expressip().getIpInfoMiddleware);
    this.server.use(
      cors({
        origin: process.env.FRONT_URL,
        // origin: false,
      })
    );
    this.server.use(express.json());
    this.server.use(
      '/uploads/img',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'img'))
    );
    this.server.use(
      '/uploads/file',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'file'))
    );
    // this.server.use('/uploads/file', express.static(uploadFile.directory));
    // this.server.use('/uploads/img', express.static(uploadImg.directory));
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
