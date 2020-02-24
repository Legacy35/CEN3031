const axios = require('axios');
const authServer = 'http://142.44.210.106';

const proxyAuthentication = (req, res) => {
    let url = authServer + '/authenticate.php' + req._parsedOriginalUrl.search;
    axios.get(url)
    .then(
        (data) => {
            res.setHeader('Content-type', 'application/json');
            res.send(data.data);
        }
    )
    .catch((err) => {
        console.log("some error :(((");
        res.send({error: "Error."});
    });
}

exports.proxyAuthentication = proxyAuthentication;