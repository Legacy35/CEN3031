const express = require('express');
const app = express();

const {proxyAuthentication} = require('./middleware/authentication.js');

/*Express boilerplate*/
app.set('port', 2046);
app.disable('x-powered-by');
app.use(express.static('public'));

/*Middleware functions*/
app.get(['/apis/authenticate/authenticate/'], proxyAuthentication);

app.listen(app.get('port'), () => {
    console.log("NodeJS router now listening on " + app.get('port') + ". Press CTRL+C to exit.");
});