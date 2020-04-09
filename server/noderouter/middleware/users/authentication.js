const axios = require('axios');
const config = require('./../../config.js');
const sanitizer = require('sanitizer');

/**
 * Proxy middleware for forwarding requests to athentication server.
 * @param {Request} req ExpressJS Request object
 * @param {Response} res ExpressJS Response object
 * @type {VoidFunction}
 */

const authenticateProxy = (req, res, next) => {


  if(!req.originalUrl.toLowerCase().includes(".php")){
    next();
    return;
  }

  let originalUrl = req.originalUrl;
  destinationUrl = config.authServer + originalUrl;

  if (req.body) {
    axios.post(destinationUrl, req.body, {
      headers: {
        Cookie: "token=" + req.cookies.token + ';'
      }
    }).then(

        (data) => {
          res.send(data.data);
        }
      )
      .catch(
        (err) => {
          res.send({
            error: 'Error',
          });
        }
      );
  } else {
    axios.get(destinationUrl, {
      headers: {
        Cookie: "token=" + req.cookies.token + ';'
      }
    }).then(
        (data) => {
          res.send(data.data);
        }
      )
      .catch(
        (err) => {
          res.send({
            error: 'Error',
          });
        }
      );
  }

}

exports.authenticateProxy = authenticateProxy;
