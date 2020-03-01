const axios = require('axios');
const config = require('./../config.js');

/*HTTP GET request*/
axios.get('/apis/cities/city').then(
    (res) => {
        
    }
).catch(
    (err) => {
        console.log(err);
    }
);
