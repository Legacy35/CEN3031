/**
 * File is currently a work in progress, do not modify
 */
const WeatherEnum = require('./../../models/accidentReport/Weather.js')
const AccidentReport = require('./../../models/accidentReport/AccidentReport.js');
const State =['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
const accidentReportPost = (req, res) => {
  axios.get('/apis/authenticate/whois.php?token=' + req.cookies.token).then(
                        (res) => {
                        if(res.data.error){
                              res.status(404);
                              res.send({error: res.data.error + " User may not exist"});
                              return;}
                        if(!res.data.isAdmin){
                              res.status(401);
                              res.send({error: "Unauthorized"});
                              return;
                        }
                      }
                    ).catch(
                            (err) => {
                                console.log(err);
                            }
                        );

  if (!req.body.cityName || !req.body.state || !req.body.date || !req.body.weather) {
    res.status(400).send({
      error: "Malformed request",
    });
    return;
  }else if(req.body.date<0 ||req.body.date>new Date()){
    res.status(400).send({
      error: "Malformed request, Date Incorrect",
    });
    return;
  }else if(State.indexOf(req.body.state)==-1){
    res.status(400).send({
      error: "Malformed request, State Incorrect",
    });

    return;
  }else if(cityName.length>2 && cityName.length<46){
    res.status(400).send({
      error: "Malformed request, City Name Incorrect",
    });
    return;
  }else if((req.body.weather.size>0 && req.body.weather.size < exports.Weather.size()-1)){
    res.status(400).send({
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
      console.log('Saved');
    }
  });

}

exports.accidentReportPost = accidentReportPost;
