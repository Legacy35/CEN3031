const CitySchema = require('../../models/city/City.js');

/**
 * Require field: id || filter
 * Optional fields: limit, sort
 */
const cityGet = async (req, res) => {

  const db = DATABASES.cities;
  const cityModel = db.model("City", CitySchema, 'cities');

  let query;

  //Determine if searching will be done via ID or by filter
  if(req.query.id){
    getCityById(req, res);
    return;
  } else if (req.query.filter || req.query.filter == "") {
    query = cityModel.find({name: new RegExp("^" + req.query.filter.toLowerCase(), "i")});
  } else {
    res.send({error: "Invalid request."});
  }

  //Set a hard limit to the number of returned results
  if(req.query.limit && req.query.limit <= 50) {
    query = query.limit(parseInt(req.query.limit));
  } else {
    query = query.limit(50);
  }

  //Apply different sorting techniques
  if(req.query.sort){
    if(req.query.sort.toLowerCase() == 'alphabetical'){
      query = query.sort({name: 'asc'});
    } else if(req.query.sort.toLowerCase() == 'ranking'){
      //TODO
    } else if(req.query.sort.toLowerCase() == 'similarity'){
      //TODO
    }
  }

  //Define callback function for query
  const callback = (err, docs) => {
    if (err) {
      res.send({ error: 'An internal error ocurred while performing this query. :(' });
      throw err;
    } else {
      let output = [];
      docs.forEach((element) => {
        output.push({ ...element._doc, _id: undefined });
      });
      res.send(output);
    }
  }

  query.exec(callback);

};

exports.cityGet = cityGet;
