/*External imports*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const databaseConnections = require('./databaseConnections.js');
const mongoose = require('mongoose');

/*Internal imports*/
const { authenticateProxy } = require('./middleware/users/authentication.js');
const {accidentReportPost} = require('./middleware/accidentReports/accidentReportPost.js');
const {cityGet} = require('./middleware/city/city.js');
const {accidentReportGet} = require('./middleware/accidentReports/accidentReportGet.js');
const {getQuizQuestions, getQuizScores} = require('./middleware/quiz/quizRoute.js');
const {quizPost} = require('./middleware/quiz/quizPost.js');

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

  let proxy = (req , res , next) =>{
    console.log("I LIVE")
    let originalUrl = req.originalUrl;
    console.log("I LIVE")
    if(!originalUrl.includes(".php")){
      next();
    }
    next();
  };

  /*Use middleware functions*/
  //app.all('*',proxy);
  app.all('/apis/authenticate*', authenticateProxy);// 1st param the rotue they are giving us, 2nd param go to where that is defined
  app.get('/apis/accidents/accident', accidentReportGet);
  app.post('/apis/accidents/accident', accidentReportPost);
  app.get('/apis/cities/city', cityGet);
  app.get('/apis/quizzes/quiz/questions', getQuizQuestions);
  app.get('/apis/quizzes/quiz/scores', getQuizScores);
  app.post('/apis/quizzes/quiz', quizPost);


  /*Start app*/
  app.listen(app.get('port'), () => {
        console.log('NodeJS router now listening on ' + app.get('port') + '. Press CTRL+C to exit.');
  });
}

start();
