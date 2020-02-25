const axios = require('axios');
const config = require('./../config.js');

/**
 * Proxy middleware for forwarding requests to athentication server.
 * @param {Request} req ExpressJS Request object
 * @param {Response} res ExpressJS Response object
 * @type {VoidFunction}
 */
const authenticateProxy = (req, res) => {
    let originalUrl = req.originalUrl;
    let splits = originalUrl.split("/");
    let destinationUrl = "";
    for(let i = 3; i < splits.length; i++){
        destinationUrl += splits[i];
    }
    destinationUrl = config.authServer + destinationUrl;
    
    if(req.body){
        axios.post(destinationUrl, req.body).then(
            
            (data) => {
                res.send(data.data);
            }
        )
        .catch(
            (err) => {
                res.send({error: "Error"});
                console.log(err);
            }
        );
    } else {
        axios.get(destinationUrl, req.body).then(
            (data) => {
                res.send(data.data);
            }
        )
        .catch(
            (err) => {
                res.send({error: "Error"});
                console.log(err);
            }
        );
    }

}

exports.authenticateProxy = authenticateProxy;

