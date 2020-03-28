/*External middleware*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const databaseConnections = require('./databaseConnections.js');
const mongoose = require('mongoose');

/*Internal middleware*/
const { authenticateProxy } = require('./middleware/users/authentication.js');
const cityRoute = require('./middleware/city/cityRoute.js');
const quizRoute = require('./middleware/quiz/quizRoute.js');
const {accidentReportPost} = require('./middleware/accidentReports/accidentReportPost.js');
const {cityGet} = require('./middleware/city/city.js');
const {accidentReportGet} = require('./middleware/accidentReports/accidentReportGet.js');
const {quizGet} = require('./middleware/quiz/quiz.js');

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

  /*Use middleware functions*/
  app.all('/apis/authenticate*', authenticateProxy);
  app.get('/apis/accidents/accident', accidentReportGet);
  app.post('/apis/accidents/accident', accidentReportPost);
  app.get('/apis/quiz/generateQuiz', quizRoute);
  app.get('/apis/cities/city', cityGet);
  app.get('/apis/quizzes/quiz', quizGet)

  /*Start app*/
  app.listen(app.get('port'), () => {
        console.log('NodeJS router now listening on ' + app.get('port') + '. Press CTRL+C to exit.');
  });
}

start();
