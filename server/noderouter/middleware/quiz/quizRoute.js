const quizQuestions = require('../../data/quizQuestions.js');
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

exports.getQuizQuestions = getQuizQuestions;
