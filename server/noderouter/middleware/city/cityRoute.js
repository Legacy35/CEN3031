const config = require('../../config.js');
const CitySchema = require('../../models/city/City.js');

/*const Sort = ['ranking', 'alphabetical', 'similarity'];*/

const citySearch = async (req, res) => {

  if(!req.query.filter || !req.query.limit || !req.query.sort){
    res.send({error: 'All fields are required.'});
    return;
  }

  if(req.query.limit > 50) req.query.limit = 50;

  const callback = (err, docs) => {
    if(err){
      res.send({error: 'An internal error ocurred while performing this query. :('});
      throw err;
    } else {
      let output = [];
      docs.forEach((element) => {
        output.push({...element._doc, _id: undefined});
      });
      res.send(output);
    }
  }

  const db = DATABASES.cities;
  const cityModel = db.model("City", CitySchema, 'cities');

  if (req.query.sort.toLowerCase() == "ranking") {

    //cityModel.find({ name: req.query.filter}).sort({ name: 'asc'}).limit(req.query.limit).exec(callback);

  } else if (req.query.sort.toLowerCase() == 'alphabetical') {

    cityModel.find({name: new RegExp("^" + req.query.filter.toLowerCase(), "i") }).sort({ name: 'asc'}).limit(parseInt(req.query.limit)).exec(callback);
 
  } else if (req.query.sort.toLowerCase() == 'similarity') {
    //TODO : Implement this for Sprint 2
    //See: TODO
  }
};

module.exports = citySearch;

//TODO:
/*
        CitySchema.collection.find({
      name: req.filter,
    }).sort({
      name: asc,
    }).limit(req.limit);
 */