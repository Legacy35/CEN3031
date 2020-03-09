const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const databaseConnections = require('./databaseConnections.js');
const mongoose = require('mongoose');

const { authenticateProxy } = require('./middleware/users/authentication.js');
const {accidentReportPost} = require('./middleware/accidentReports/accidentReportRoute.js');
const cityRoute = require('./middleware/city/cityRoute.js');

const start = async () => {

  /*Express boilerplate*/
  app.set('port', 2046);
  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());
  app.use(express.static('public'));

  /*Create mongoose connections in global scope using the DATABASES object*/
  mongoose.Promise = global.Promise;
  await databaseConnections.init();

  /*Middleware functions*/
  app.all('/apis/authenticate*', authenticateProxy);
  app.post('/apis/accidents/accident', accidentReportPost);
  app.get('/apis/cities/city', cityRoute);

  app.listen(app.get('port'), () => {
        console.log('NodeJS router now listening on ' + app.get('port') + '. Press CTRL+C to exit.');
  });
}

start();
