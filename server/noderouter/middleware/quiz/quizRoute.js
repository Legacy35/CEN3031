const quizQuestions = require('../../data/quizQuestions.js');
const User = require('../../models/user/User.js');
const {whois} = require('../../whois.js');


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

  const db = DATABASES.users;
  const userModel = db.model('User', User, 'users');

  userModel.findOne({_id: userData.id})
  .then((data) => {
      if(data) {
          res.send(data.quizzes);
      } else {
          res.send([]);
      }
  })
  .catch((err) => {
      if(err) throw err;
  });

}

exports.getQuizQuestions = getQuizQuestions;
exports.getQuizScores = getQuizScores;
