const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config.js');
const cookieParser = require('cookie-parser');
const databaseConnections = require('./databaseConnections.js');

const { authenticateProxy } = require(config.authenticationFile);
const {accidentReportGet, accidentReportPost} = require('./middleware/accidentReports/accidentReportRoute.js');

const start = async () => {

  /*Express boilerplate*/
  app.set('port', 2046);
  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());
  app.use(express.static('public'));
  
  /*Create mongoose connections in global scope using the DATABASES object*/
  await databaseConnections.init();
  
  /*Middleware functions*/
  app.all('/apis/authenticate*', authenticateProxy);
  app.get('/apis/accidents/accident', accidentReportGet);
  app.post('/apis/accidents/accident', accidentReportPost);

  app.listen(app.get('port'), () => {
        console.log('NodeJS router now listening on ' + app.get('port') + '. Press CTRL+C to exit.');
  });
}

start();
