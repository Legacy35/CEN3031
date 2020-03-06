/**
 * File is currently a work in progress, do not modify
 */
const axios = require('axios');
const queryString = require('query-string');

const AccidentReport = require('./../../models/accidentReport/AccidentReport.js');
const City = require('./../../models/city/City.js');

const State = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
const config = require('../../config.js')

const authorized = (req, res) => {

    axios.get(config.authServer + 'whois.php?token=' + req.cookies.token).then(
        (resp) => {
            if (resp.data.error) {
                res.send({ error: + "User may not exist" });
                return false;
            }
            if (!resp.data.admin) {
                res.send({ error: "Unauthorized" });
                return false;
            } else {
                return true;
            }
        }
    ).catch(
        (err) => {
            if (err) {
                res.send({ error: "Error" });
                console.log(err);
                return false;
            }
        }
    );

}

const accidentReportPost = (req, res) => {

    /*Validate request*/
    if(!authorized(req, res)) return;

    /*Validate input*/
    if (!req.body.cityName || !req.body.state || !req.body.date || !req.body.weather) {
        res.send({
            error: "Malformed request",
        });
        return;
    } else if (req.body.date < 0 || req.body.date > new Date()) {
        res.send({
            error: "Malformed request, Date Incorrect",
        });
        return;
    } else if (State.indexOf(req.body.state) == -1) {
        res.send({
            error: "Malformed request, State Incorrect",
        });
        return;
    } else if (req.body.cityName.length < 2 || req.body.cityName.length > 46) {
        res.send({
            error: "Malformed request, City Name Incorrect",
        });
        return;
    } else if ((req.body.weather.size > 0 && req.body.weather.size < exports.Weather.size() - 1)) {
        res.send({
            error: "Malformed request, Weather Incorrect",
        });
        return;
    }

    /*Store accident in DB*/
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
            console.log(err);
            res.send({ error: "Error :(" });
            return;
        } else {
            res.status(200).send("OK");
        }
    });

    /*Generate city and store in cities db*/

    let params = {
        q: req.body.cityName + ',' + req.body.state,
        key: 'f2e278c415b74f7db345af774a40e473'
    }
    axios.get('https://api.opencagedata.com/geocode/v1/json?' + queryString.stringify(params)).then(
        (res) => {
            if (!res.data.total_results) {
                return;
            }

            let highestConfidence = 0; //Index of highest confidence result
            for (let i = 0; i < res.data.results.length; i++) {
                if (res.data.results[i].confidence > res.data.results[highestConfidence].confidence) {
                    highestConfidence = i;
                }
            }
            let result = res.data.results[highestConfidence];

            if (result.components.state.toLowerCase()
            != req.body.state.toLowerCase()
            || result.components.city.toLowerCase()
            != req.body.cityName.toLowerCase()) {
                return;
            }

            let coords =  {latitude: result.geometry.lat, longitude: result.geometry.lng};

            db = DATABASES.cities;

            const cityModel = db.model('City', City, 'cities');

            let match = false;

            cityModel.find({state: result.components.state, name: result.components.city}, (err, docs) => {
                if(err){
                    console.log(err);
                    return;
                } else {
                    if(docs.length <= 0){
                        
                        const modelCity = new cityModel({
                            name: req.body.cityName,
                            state: req.body.state,
                            coordinates: coords
                        });
                        modelCity.save((err, modelCity) => {
                            if(err) console.log(err);
                        });

                    }
                }
            });

        }
    ).catch(
        (err) => {
            console.log(err);
            return;
        }
    )


}

exports.accidentReportPost = accidentReportPost;