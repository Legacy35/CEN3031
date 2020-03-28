const User = require('../../models/user/User.js');
const axios = require('axios');
const config = require('../../config.js');
const {whois} = require('../../whois.js');

const quizGet = async (req, res) => {

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

exports.quizGet = quizGet;