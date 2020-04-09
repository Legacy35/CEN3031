//const quizQuestions = require('../../data/quizQuestions.js');
//const User = require('../../models/user/User.js');
const {whois} = require('../../whois.js');
const {GETQuizScore} = require('../../GETQuizScore.js');

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const getQuizQuestions = async (req, res) => {

  const numberOfQuestions = quizQuestions.length >= 10 ? 10 : quizQuestions.length;

  const output = new Array(numberOfQuestions);

  const shuffled = shuffle(quizQuestions);

  for(let i = 0; i < output.length; i++){
    output[i] = shuffled[i];
  }

  res.send(output);

}

const getQuizScores = async (req, res) => {

  let userData = await whois(req, res);

  userData = userData.data;
  if(!userData.id) {
      res.send({error: 'You must be signed in to perform this operation.'});
      return;
  }
console.log("1");
  let quizData = await GETQuizScore(req, res);
  console.log("2");
  console.log(quizData);
  console.log("3");
  let output= [];
  for(let i=0;i<quizData.data.length;i++){
    output[i]=quizData.data[i][0];
  }
  console.log("4");
  console.log(output);
  res.send(output);



}

exports.getQuizQuestions = getQuizQuestions;
exports.getQuizScores = getQuizScores;
