const axios = require('axios');
const config = require('./config.js');

GETQuizScore = async (req, res) => {

    let output = {};

    if(!req.cookies.token) return output;
    await axios.get(config.authServer + '/Requests/GETQuizScore.php?token=' + req.cookies.token)
    .then(
        (data) => {
            output = data;
        }
    )
    .catch(
        (err) => {
            if(err) throw error;
        }
    );
  //  console.log(output.data);
    return output;

}

exports.GETQuizScore = GETQuizScore;