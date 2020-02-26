
# Authentication Server

  

## Summary

  

To provide a login system that is both secure and easy to use, we have created a REST (HTTP) API using the LAMP (Linux, Apache, MySQL, PHP) stack. The data stored in this sytem is minimal, but is highly secure. It includes sensitive data such as user emails, salted and hashed passwords, and user privilidge data.

  

To use the API, the web client sends HTTP requests to to the ```/apis/authentication/``` route. The client is able to create new accounts this way as well as retrieve an account's session token provided its email address and password.

  

Once the client gets a session token, it stores the token as a cookie as ```token=token_value_here```. From there, all future requests will send this token as a means of authenticating the user. This is currently accomplished using the universal-cookies API for NodeJS.

  

## Accessing the Authentication API

  

Front-end developers don't need to worry about the physical IP address/URL of the authentication server as it is contacted via proxy. For back-end developers, the address of the authentication server is stored in ```CEN3031/server/noderouter/config.json``` file as the ```js authServer``` variable. This value should be referenced rather than hard-coded as the IP of the auth server is subject to change.

## Request/Response Formats

### Creating an account

Target: ```/apis/authentication/authenticate.php```

Method: ```POST```

Params :
```js
{
    email: "cow@cow.jp",
    password: "this_is_very_secure",
    passwordConfirm: "this_is_very_secure"
}
```

Possible responses:
```js
{
    error: "Some string here"
}
```
```js
{
    token: "1024-bit unique token here stored as a string"
}
```

### Signing in

### Looking up an account with a session token
