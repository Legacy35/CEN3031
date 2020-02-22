# Authentication Server

* All requests to the authentication server are HTTP POST and GET requests. PHP Can't understand anything other than POST and GET.

* Session tokens are 1024 bit strings generated using a cryptographically secure pseudorandom number generation algorithm. 

* Requests can be made to authenticate.php and whois.php. authentication.php can be used to create accounts and generate session tokens depending on whether or not a POST or GET request is used.

  * To create an account, send a POST request to authenticate.php with the **email**, **password**, and **passwordConfirm** parameters

  * To generate a token using a set of account credentials, make a GET request to authenticate.php with the **email** and **password** parameters.

  * To retrieve information about an account, send a GET request to whois.php with the **token** parameter. Looking up a user 

* Response objects can be one of the following:

  * Authenticate.php

    * An object whose sole field is "token" equal to a generated session token

    * An object whose sole field is "error". Error describes what went wrong.

  * whois.php

    * A data set containing account data

* When signing up, the response object contains a session token to avoid the need to sign in immediately after signing up.

* A list of all currently valid session tokens is maintained by the authentication server. The authentication server should be contacted prior to every request that requires elevated privileges. Outdated session tokens are removed every whois query.

```js
//Signing up with the auth server. Assuming no errors, a token object will be sent back.
const axios = require('axios');

axios.post('http://127.0.0.1:80/authenticate.php', null, {params: {email: "cameron2@white.com", password: "pass", passwordConfirm: "pass"}}).then(
  (res) => {
    console.log(res.data);
  }
);
```

```js
//Example of a token object that is sent as a response during account creation and authentication.
{
    token: '48388382f13ffadbf1ad3c6d63457f7537ebdf9748403696e7ed1b139e59e103505c8d699ff6c60ce7f1aa039c040e1d6da3398c083ff4ac0838ab53449408a918305e70a820b283675ce8c3fb0523237bb845f813773dfde2b5351fed744f9$
}
```

```js
// Generating a session token using the auth server. Assuming no errors, a token is sent back.
const axios = require('axios');

axios.get('http://127.0.0.1:80/authenticate.php?email=cameron2@white.com&password=pass').then(
  (res) => {
    console.log(res.data);
  }
);
```

```js
//Example of an error object
{
    error: 'Account does not exist.'
}
```
