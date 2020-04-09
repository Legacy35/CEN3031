const axios = require('axios');
const config = require('./config.js');

GETQuizScore = async (req, res) => {
console.log("11");
    let output = {};

    if(!req.cookies.token) return output;
console.log("12");
console.log(req.cookies.token);
console.log("13");
    await axios.get(config.authServer + '/GETQuizScore.php?token=' + req.cookies.token)
    .then(
        (data) => {
            console.log("I got here");
            output = data;
        }
    )
    .catch(
        (err) => {
          console.log("14");
            if(err) console.log(error);
        }
    );
    //console.log(output.data);
    return output;

}

exports.GETQuizScore = GETQuizScore;
