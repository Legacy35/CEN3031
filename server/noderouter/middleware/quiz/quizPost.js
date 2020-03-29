const {whois} = require('../../whois.js');
const quizQuestions = require('../../data/quizQuestions.js');
const User = require('../../models/user/User.js');

const storeResult = async (req, res, score, whoisData) => {

    const db = DATABASES.users;
    const userModel = db.model('User', User, 'users');
    
    let quizzes = [score];

    await userModel.findOne({_id: whoisData.id}, (err, doc) => {
        if(err) throw err;
        if(doc) {
            doc.quizzes = [...doc.quizzes, score];
            doc.save();
        } else {
            userModel.create({_id: whoisData.id, quizzes: quizzes});
            
        }
    });

}

const quizPost = async (req, res) => {

    let whoisData = await whois(req, res);
    whoisData = whoisData.data;

    if(!whoisData.id){
        res.send({error: "You must be signed in to perform this operation."})
    }

    if(!req.body.questionCount){
        res.send({error: "Invalid request"});
    }

    let questionCount = req.body.questionCount;
    let correct = 0;

    for(let i = 0; i < quizQuestions.length; i++){
        let questionKey = 'q' + quizQuestions[i]._id;
        if(req.body[questionKey] === undefined) continue;
        let answer = req.body[questionKey];
        if(answer == quizQuestions[i].correctAnswer) correct++;
    }

    let score = (correct / questionCount) * 100;

    storeResult(req, res, score, whoisData);

    res.send({score: score});

}

exports.quizPost = quizPost;