
# Cities API

## API Classes & Enums

```js
class City {
    _id: <string>,
    coordinates: {
        latitude: <float>,
        longitude: <float>
    },
    name: <string>,
    rank: <int>,
    climate: <Climate ENUM>,
    state: <string>, //optional
    country: <string>
}
```
```js
const Climate = ["Hot", "Warm", "Cold"];
```
```js
const Weather = ["Sunny", "Raining", "Foggy"];
```
```js
class AccidentReport {
   city: <string>, /*City's _id field*/
   time: <Date>, /*VanillaJS Date*/
   weather: <String[]> /*String array as defined in Weather enum*/
}
```
[VanillaJS Date Object](https://www.w3schools.com/jsref/jsref_obj_date.asp)
```js
class User {
    _id: <string>, /*MongoDB ID*/
    email: "cow@cow.jp",
    admin: <boolean>
}
```


## Request Specifications

### Searching for a city

Description: Get an array of cities from the back-end that is sorted, filtered, and limited according to input parameters. **Results should be stored in memory** to prevent unnecessary requests. 

Target: ```/apis/cities/search```

Method: ```GET``` (URL Encoded)

Response type: ```City[]```

Parameters:

```js
{
    sort: <int>,/*According to ENUM */
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
      rank: 1,
      climate: "Sunny",
      state: "Florida", //optional
      country: "US"
  },
  {
      _id: 2,
      coordinates: {
          latitude: 5.0,
          longitude: 15.5
      },
      name: "Schzen",
      rank: 2,
      climate: "Temperate",
      state: "Wuhan", //optional
      country: "CN"
  },
]
```

### Adding a new accident report to DB

Description: Only administrator accounts can add a new city. Non-administrators will be sent an error if they attempt to add one. 

Target: ```/apis/accidents/create```

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


