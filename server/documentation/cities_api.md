
# Cities & Accidents API

## Introduction

Given that our project is a web project, all client-server communication will be conducted using HTTP requests (no web sockets). HTTP requests can be easily performed using the NodeJS Axios library like so:

```js
import axios from 'axios';

/*HTTP GET request*/
axios.get('http://website.com').then(
    (res) => {
        console.log(res.data);
    }
).catch(
    (err) => {
        console.log(err);
    }
);

/*HTTP POST request*/
axios.post('http://www.website.com/signup.php', { email: "cow@cow.jp", password: "this_is_very_secure"}).then(
    (res) => {
        /*Do whatever the hell you want with the response here.*/
    }
).catch(
    (err) => {
        /*Handle the error*/
    }
);

```

The above example shows how to import axios on the front-end. For the back-end, importing axios is slightly different:

```js
const axios = require('axios');
```

Supplying paramaters for POST requests is straightforward as seen above. GET requests are slightly different. In the above example where we create an account, if we wanted to make it a GET method instead, we would do this:

```js
axios.get('http://www.website.com/signup?email=cow@cow.jp&password=this_is_very_secure');
```

GET is the only HTTP method where the paramaters are stored inside the URL. Converting variables into a URL string can get complicated and tedious very quickly, so you should use Node's built-in QueryString library to encode and decode URL parameters instead:

```js
const querystring = require('querystring');

let params = {
    email: "cow@cow.jp",
    password: "this_is_very_secure"
}

let urlEncoded = querystring.encode(params); //urlEncoded = is now "email=cow@cow.jp&password=this_is_very_secure"
```

**Note:** the querystring library doesn't take into account the ? needed in GET requests, like in ```website.com/signup?email=...```. Make sure to add the ? when making a GET request. For back-end developers, there are ExpressJS middleware functions that handle this part of the process automatically.

## API Standards

For the sake of avoiding repetition, you can assume that the following is true for all of the APIs we make as a team:

**Errors**

If an error occurs during a request, this is what the response will look like:

```js
{
    error: "Whoops! Something went wrong. ¯\_(ツ)_/¯"
}
```

You should check all responses to ensure the request was valid. Error messages are intended to be displayed to the user.

## API Classes & Enums

There are several data types and constants used for the city and accident API:

### City data formats

```js
class City {
    name: <string>,
    state: <string>, /*Eg: "Florida", not "FL". Can also be a province or territory.*/
    coordinates: {
        latitude: <float>,
        longitude: <float>
    },
    climate: <Climate>,
}
```
```js
const Climate = ["Hot", "Warm", "Cold"]; /*Climate enum*/
```
### Accident report data formats

```js
class AccidentReport {
   cityName: <string>,
   state: <string>, /*Full name of state, not code*/
   date: <int>, /*Unix Epoch int*/
   weather: <Weather[]> /*Values of weather must be from Weather enum*/
}
```
```js
const Weather = ["Sunny", "Raining", "Foggy"]; /*Weather enum*/
```
The AccidentReport class uses the [VanillaJS Date object](https://www.w3schools.com/jsref/jsref_obj_date.asp)

### Sorting Enum

```js
const Weather = ["Rank", "Alphabetical", "Similarity"]; /*Weather enum*/
```

## Request Specifications

### Searching for a city

Description: Get an array of cities from the back-end that is sorted, filtered, and limited according to input parameters. **Results should be stored in memory** to prevent unnecessary requests.

Target: ```/apis/cities/city```

Method: ```GET``` (Params are URL Encoded)

Response type: ```City[]```

Parameters:

```js
{
    sort: <int>, /*Value from Sort enum*/
    filter: <string>, /*only returns cities with value of filter in name */
    limit: <int>, /*Maximum number of returned results. Hard limit of 100 results */
    city: <string> /*A City object's _id field*/
}
```

Response object: Array of City objects as defined above. Example:

```js
[
  {
      _id: 1,
      coordinates: {
          latitude: 0.0,
          longitude: 0.0
      },
      name: "Null Island",
      climate: "Sunny",
      state: "Florida", //optional
  },
  {
      _id: 2,
      coordinates: {
          latitude: 5.0,
          longitude: 15.5
      },
      name: "Schzen",
      climate: "Temperate",
      state: "Wuhan", //optional
  },
]
```

### Adding a new accident report to DB

Description: Only administrator accounts can add a new city. Non-administrators will be sent an error if they attempt to add one.

Target: ```/apis/accidents/accident```

Method: ```POST```

Params:

```js
{
    cityName: <string>,
    stateCode: <string>, //EG: "Florida" not the 2-character code
    date: <Date>, /*VanillaJS Date. Should be accruate in minutes*/
}
```

Response: None / Default

### Getting graphs (WIP)

Description: **In progress**. Response will always be the same information for the time being. The information is meant to be rendered by the client into an interactive graph using the ____ library.




```js
class User {
    _id: <string>, /*MongoDB ID*/
    email: "cow@cow.jp",
    admin: <boolean>
}
```
