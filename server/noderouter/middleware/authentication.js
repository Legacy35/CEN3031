const axios = require('axios');
const config = require('./../config.js');

const authenticateProxy = (req, res) => {
    let originalUrl = req.originalUrl;
    let splits = originalUrl.split("/");
    let destinationUrl = "";
    for(let i = 3; i < splits.length; i++){
        destinationUrl += splits[i];
    }
    destinationUrl = config.authServer + destinationUrl;
    console.log(destinationUrl);
    
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