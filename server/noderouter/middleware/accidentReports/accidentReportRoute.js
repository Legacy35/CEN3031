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

/** TODO: Fix Mongoose Promises
 * Returns true if successful, false if fails
 * @param {*} req 
 * @param {*} res 
 */
const storeAccident = async (req, res) => {

    let coords = await getCoords(req, res);

    if(!coords){
        output = false;
    }

    let db = DATABASES.accidentReports;
    const modelReport = db.model('AccidentReport', AccidentReport, 'accidentReports');
    const docReport = new modelReport({
        cityName: req.body.cityName,
        state: req.body.state,
        date: req.body.date,
        weather: req.body.weather
    });

    docReport.save((err, docReport) => {
        if (err) {
            throw err;
        }
    });

    return true;

}

/**
 * Returns coordinate object if succeeds, returns false if fails.
 * @param {*} req 
 * @param {*} res 
 */
const getCoords = async (req, res) => {

    let output;

    let params = {
        q: req.body.cityName + ',' + req.body.state,
        key: config.openCageKey
    }

    await axios.get('https://api.opencagedata.com/geocode/v1/json?' + queryString.stringify(params)).then(
        (res) => {

            if (res.data.total_results <= 0) {
                console.log(1)
                output = false;
                return;
            }

            let highestConfidence = 0; //Index of highest confidence result
            for (let i = 0; i < res.data.results.length; i++) {
                if (res.data.results[i].confidence > res.data.results[highestConfidence].confidence) {
                    highestConfidence = i;
                }
            }
            let result = res.data.results[highestConfidence];

            if(result.components === undefined || result.components.state === undefined){
                console.log(result.components);
                output = false;
                return;
            }

            /*if (result.components.state.toLowerCase() != req.body.state.toLowerCase() || result.components.city.toLowerCase() != req.body.cityName.toLowerCase()) {
                output = false;
                return;
            }*/

            let coords =  {latitude: result.geometry.lat, longitude: result.geometry.lng};
            output = coords;
        }
    ).catch((err) => {
        output =  false;
        throw err;
    });

    return output;

}

/**
 * Returns true if the city already exists or was created, returns false if failed.
 * @param {*} req 
 * @param {*} res 
 */
const generateCity = async (req, res) => {

    let alreadyExists = false;

    db = DATABASES.cities;

    const cityModel = db.model('City', City, 'cities');

    await cityModel.find({state: req.body.state, name: req.body.cityName}, (err, docs) => {
        if(err){
            console.log(err);
            alreadyExists = true;
        } else {
            if(docs.length <= 0) {
                alreadyExists = false;
            } else {
                alreadyExists = true;
            }
        }
    });

    if(alreadyExists) return true;

    let coords = await getCoords(req, res);
    if(!coords) return false;

    const modelCity = new cityModel({
        name: req.body.cityName,
        state: req.body.state,
        coordinates: coords
    });
    modelCity.save((err, modelCity) => {
        if(err) console.log(err);
    });

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

    /*Store accident in DB*/
    if (await storeAccident(req, res)) {
        res.status(200).send("OK");
    } else {
        res.send({ error: "An error occurred while attempting to store the entry. Was the city name and state entered correctly?"});
        return;
    }

    /*Generate city and store in cities db*/
    generateCity(req, res);


}

exports.accidentReportPost = accidentReportPost;