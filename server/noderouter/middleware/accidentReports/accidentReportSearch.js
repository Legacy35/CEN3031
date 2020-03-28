const mongoose = require('mongoose');
const City = require('../../models/city/City.js');

const accidentReportSearch = (req, res) => {

    if(!req.query.id) {
        res.send({error: "All fields are required."});
    }

    const db = DATABASES.cities;
    const modelCity = db.model('City', City, 'cities');
    modelCity.findOne({_id: req.query.id}, {accidents: "*"})
    .then(
        (data) => {
            res.send(data.accidents);
        }
    )
    .catch(
        (err) => {
            if(err){
                console.log(err);
                res.send({error: "Error"});
            }
        }
    );

} 

exports.accidentReportSearch = accidentReportSearch;