const axios = require('axios');
const config = require('./config.js');

whois = async (req, res) => {

    let output = {};

    if(!req.cookies.token) return output;

    await axios.get(config.authServer + '/apis/authenticate/whois.php?token=' + req.cookies.token)
    .then(
        (data) => {
            output = data;
        }
    )
    .catch(
        (err) => {
            if(err) throw err;
        }
    );

    return output;

}

exports.whois = whois;