/**
 * File is currently a work in progress, do not modify
 */

const AccidentReport = require('./../../models/accidentReport/AccidentReport.js');

const accidentReportGet = (req, res) => {

}

const accidentReportPost = (req, res) => {

    if(!req.body.cityName || !req.body.state || !req.body.date || !req.body.weather){
        res.status(400).send({
            error: "Malformed request"
        });
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
        if(err) {
            console.log(err);
            res.send('err');
            return;
        } else {
            console.log('Saved');
        }
    });

}

exports.accidentReportGet = accidentReportGet;
exports.accidentReportPost = accidentReportPost;