const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config.js');
const cookieParser = require('cookie-parser');

const { authenticateProxy } = require(config.authenticationFile);


/*Express boilerplate*/
app.set('port', 2046);
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('public'));

/*Middleware functions*/
app.all('/apis/authenticate*', authenticateProxy);

app.listen(app.get('port'), () => {
      console.log('NodeJS router now listening on ' + app.get('port') + '. Press CTRL+C to exit.');
    });
