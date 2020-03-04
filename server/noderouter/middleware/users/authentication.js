const axios = require('axios');
const config = require('./../../config.js');
const sanitizer = require('sanitizer');

/**
 * Proxy middleware for forwarding requests to athentication server.
 * @param {Request} req ExpressJS Request object
 * @param {Response} res ExpressJS Response object
 * @type {VoidFunction}
 */

const sanitize = (obj) => {
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = sanitizer.sanitize(obj[keys[i]]);
  }
  return obj;
}

const authenticateProxy = (req, res) => {
  let originalUrl = req.originalUrl;
  let splits = originalUrl.split("/");
  let destinationUrl = '';
  for (let i = 3; i < splits.length; i++) {
    destinationUrl += splits[i];
  }
  destinationUrl = config.authServer + destinationUrl;

  if (req.body) {
    axios.post(destinationUrl, req.body).then(

        (data) => {
          res.send(sanitize(data.data));
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
    axios.get(destinationUrl, req.body).then(
        (data) => {
          res.send(sanitize(data.data));
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
