const CitySchema = require('../../models/city/City.js');

/*const Sort = ['ranking', 'alphabetical', 'similarity'];*/

/**
 * 
 * Requried fields: filter, limit, sort
 */
const citySearch = async (req, res) => {

  if(req.query.filter !== undefined && req.query.limit !== undefined && req.query.sort !== undefined) {
    citySearchGUI(req, res);
  } else if(req.query.id !== undefined) {
      getCityById(req, res);

  }
  

};

const getCityById = (req, res, showAccidents) => {

  const db = DATABASES.cities;
  const cityModel = db.model("City", CitySchema, 'cities');

  cityModel.findOne({_id: req.query.id})
  .then(
    (data) => {
      res.send(data);
    }
  )
  .catch(
    (err) => {
      if(err) {
        res.send({error: "Error"});
        console.log(err);
      }
    }
  );

}

const citySearchGUI = (req, res) => {
  
  let params = {
    filter: req.query.filter,
    limit: (req.query.sort && req.query.sort <= 50) ? req.query.sort : 10,
    sort: req.query.sort,
  }

  const db = DATABASES.cities;
  const cityModel = db.model("City", CitySchema, 'cities');

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

  if (req.query.sort.toLowerCase() == "ranking") {


    cityModel.find({name: new RegExp("^" + req.query.filter.toLowerCase(), "i") }).sort({ name: 'asc'}).limit(parseInt(req.query.limit)).exec(callback);


  } else if (req.query.sort.toLowerCase() == 'alphabetical') {
if(req.query.filter!=""){
    cityModel.find({name: new RegExp("^" + req.query.filter.toLowerCase(), "i") }).sort({ name: 'asc'}).limit(parseInt(req.query.limit)).exec(callback);
}else{
    cityModel.find({}).sort({ name: 'asc'}).limit(parseInt(req.query.limit)).exec(callback);
}
  } else if (req.query.sort.toLowerCase() == 'similarity') {

  }
}

exports.citySearch = citySearch;
