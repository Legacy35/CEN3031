const config = require('../../config.js');
const QuestionSchema = require('../../models/quiz/question.js');
let output = [];//made global because callback gets called multiple times
//copied from City route
const callback = (err, docs) => {
  if(err){
    res.send({error: 'An internal error ocurred while performing this query. :('});
    throw err;
  } else {
    docs.forEach((element) => {
      output.push({...element._doc, _id: undefined});
    });
  }
}
//gets 10 random unique questions from the database
const getQuizQuestions = async (req, res) => {
  const questionModel = db.model("Question", QuestionSchema, 'questions');

  questionModel.count().exec(function(err, count) { // gets count of how many Questions in the DB
    if(count>10){//Makes sure there is atleast 10 so there is not an infinit
    let questions = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    for(let i=0;i<10;i++) {
      let cont2 = true;
      while (cont2) {
          var random = Math.floor(Math.random() * count);
          if(questions.indexof(random)== -1){
            questions[i]=random;
            cont2=false;
          }
      }

    }

    // Again query all users but only fetch one offset by our random #
    questionModel.findOne().skip(questions[0]).exec(callback);
    questionModel.findOne().skip(questions[1]).exec(callback);
    questionModel.findOne().skip(questions[2]).exec(callback);
    questionModel.findOne().skip(questions[3]).exec(callback);
    questionModel.findOne().skip(questions[4]).exec(callback);
    questionModel.findOne().skip(questions[5]).exec(callback);
    questionModel.findOne().skip(questions[6]).exec(callback);
    questionModel.findOne().skip(questions[7]).exec(callback);
    questionModel.findOne().skip(questions[8]).exec(callback);
    questionModel.findOne().skip(questions[9]).exec(callback);
    res.send(output);
  });
}
});

module.exports = quiz;
