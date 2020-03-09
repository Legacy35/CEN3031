/**
 * File is currently a work in progress, do not modify
 */
const axios = require('axios');
const queryString = require('query-string');

const AccidentReport = require('./../../models/accidentReport/AccidentReport.js');
const City = require('./../../models/city/City.js');

const State = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
const config = require('../../config.js')

/**
 * Returns true if user is authorized, false if not.
 * @param {*} req 
 * @param {*} res 
 */
const authorized = async (req, res) => {

    let output = false;

    await axios.get(config.authServer + 'whois.php?token=' + req.cookies.token).then(
        (resp) => {

            output = true;

            if (resp.data.error) {
                output = false;
            } else if (resp.data.admin != 1) {
                output = false;
            } else {
                output = true;
            }
        }
    ).catch(
        (err) => {
            if (err) {
                output = false;
            }
        }
    );

    return output;

}

/**
 * Returns true if valid, returns string with error message if not.
 * @param {*} req 
 * @param {*} res 
 */
const inputValidation = (req, res) => {
    if (!req.body.cityName || !req.body.state || !req.body.date || !req.body.weather) {
        return "Malformed request";
    } else if (req.body.date < 0 || req.body.date > new Date()) {
        return "Malformed request, Date Incorrect";
    } else if (State.indexOf(req.body.state) == -1) {
        return "Malformed request, State Incorrect";
    } else if (req.body.cityName.length < 2 || req.body.cityName.length > 46) {
        return "Malformed request, City Name Incorrect";
    } else if ((req.body.weather.size > 0 && req.body.weather.size < exports.Weather.size() - 1)) {
       return "Malformed request, Weather Incorrect";
    } else {
        return true;
    }
}

const getOpenCageCity = async (req, res) => {

    let output;

    let params = {
        q: req.body.cityName + ',' + req.body.state,
        key: config.openCageKey
    }

    await axios.get('https://api.opencagedata.com/geocode/v1/json?' + queryString.stringify(params)).then(
        (resp) => {
            let results = resp.data.results;
            let index = 0;
            for(let i = 0; i < results.length; i++){
                if(results[i].confidence > results[index].confidence) {
                    index = i;
                }
            }
            output = results[index];
        }
    ).catch(
        (err) => {
            throw err;
        }
    );

    return output;

}

const getAccident = async (req, res) => {
    return {
        date: parseInt(req.body.date),
        weather: req.body.weather
    }
}

const storeAccident = async (req, res, openCageCity) => {

    let output = true;

    if(!openCageCity.components.city || !openCageCity.components.state){
        return false;
    }

    const db = DATABASES.cities;

    const modelCity = db.model('City', City, 'cities');

    let cities;

    await modelCity.find({name: new RegExp("^" + openCageCity.components.city, "i"), state: new RegExp("^" + openCageCity.components.state, "i")}, (err, docs) => {
        if(err) {
            output = false;
            throw err;
        }
        cities = docs;
    }).catch((err) => {
        if(err) {
            output = false;
            throw err;
        }
    })

    if(cities.length == 0){

        let city = await getOpenCageCity(req, res);
        let coords = {latitude: city.geometry.lat, longitude: city.geometry.lng};
        let accident = await getAccident(req, res);
        let someObj = {
            name: req.body.cityName,
            state: req.body.state,
            coordinates: coords,
            accidents: [accident]
        };
        console.log(someObj);
        await new modelCity(someObj).save().catch((err) => {
            output = false;
            if(err) {
                output = false;
                throw err;
            }
        });

    } else if(cities.length == 1) {
        return false;

    } else if (cities.length > 1){
        output = false;
    }

    return output;

}

const accidentReportPost = async (req, res) => {

    /*Authorize request*/
    if(!authorized(req, res)) {
        res.send({error: "You are not authorized to perform this action."})
        return;
    }

    /*Validate input*/
    if(inputValidation(req, res)  !== true){
        res.send({error: inputValidation(req, res)});
        return;
    }

    let openCageCity = await getOpenCageCity(req, res);

    if(!storeAccident(req, res, openCageCity)){
        res.send({error: "An error occurred while performing this query. Either something went wrong on our end, or you aren't be specific enough when specificying a city."})
        return;
    }


    res.status(200).send("OK");
    

}

exports.accidentReportPost = accidentReportPost;