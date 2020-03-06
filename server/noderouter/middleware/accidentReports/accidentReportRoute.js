/**
 * File is currently a work in progress, do not modify
 */
const axios = require('axios');

const AccidentReport = require('./../../models/accidentReport/AccidentReport.js');
const State = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
const config = require('../../config.js')

const accidentReportPost = (req, res) => {
     axios.get(config.authServer + 'whois.php?token=' + req.cookies.token).then(
        (resp) => {
            if (resp.data.error) {
                res.send({ error: + "User may not exist" });
                return;
            }
            if (!resp.data.admin) {
                res.send({ error: "Unauthorized" });
                return;
            } else {

            }
        }
    ).catch(
        (err) => {
            if (err) {
                res.send({ error: "Error" });
                console.log(err);
                return;
            }
        }
    );

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

    const db = DATABASES.accidentReports;
    const model = db.model('AccidentReport', AccidentReport, 'accidentReports');
    const doc = new model({
        cityName: req.body.cityName,
        state: req.body.state,
        date: req.body.date,
        weather: req.body.weather
    });
    doc.save((err, doc) => {
        if (err) {
            console.log(err);
            res.send('err');
            return;
        } else {
            res.send('OK');
        }
    });

}

exports.accidentReportPost = accidentReportPost;
