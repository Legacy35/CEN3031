import React from 'react';
import axios from 'axios';

const SubmitAccident = (props) => {

    /**
     * Returns false if it fails, returns seconds since Unix Epoch if succeeds. 
     * @param {*} input String in the format of MM/DD/YYYY HH:MM that describes a date object.
     */
     
    /**
     * Converts comma-seperated list into into array of Strings as defined in weather constant
     * @param {*} input 
     */

    const onSubmit = () => {

        let form = document.getElementById('formSubmitAccident');

        if(!form.cityName.value || !form.state.value || !form.date.value || !form.precipitation.value || !form.fog.value || !form.wind.value) {
            alert('All fields are required');
            return;
        }

        let unixDate = form.date.valueAsDate;

        if(unixDate.getTime() < 0) {
            alert('Accidents before January 1st, 1970 cannot be submitted to the database. See: Unix Epoch');
            return;
        }

        if(unixDate.getTime() > new Date()){
            alert("You can't submit an accident in the future!");
            return;
        }

        let weatherArr = [];
        weatherArr.push(form.precipitation.value);
        if(form.fog.checked) weatherArr.push("Fog");
        if(form.wind.checked) weatherArr.push("Wind");

        let params = {
            cityName: form.cityName.value,
            state: form.state.value,
            weather: weatherArr,
            date: unixDate.getTime()
        };

        axios.post('/apis/accidents/accident.php', params).then(
            (res) => {
                console.log(res);
                if(res.data.error){
                    alert(res.data.error);
                } else {
                    alert('Entry recorded in database. :)');
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );

    }

    return (

        <div>
            <h2>Location &amp; Time</h2>
            <hr></hr>
            <form id="formSubmitAccident">
                <div className="row form-group">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="cityName">City name:</label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <input name="cityName" className="form-control" placeholder="Syndney"></input>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="state">State:</label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <select name="state" className="form-control" >
                            <option value="Alabama">Alabama</option>
                            <option value="Alaska">Alaska</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Arizona">Arizona</option>
                            <option value="Arkansas">Arkansas</option>
                            <option value="California">California</option>
                            <option value="Colorado">Colorado</option>
                            <option value="Connecticut">Connecticut</option>
                            <option value="Delaware">Delaware</option>
                            <option value="District of Columbia">District of Columbia</option>
                            <option value="Florida">Florida</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Guam">Guam</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Idaho">Idaho</option>
                            <option value="Illinois">Illinois</option>
                            <option value="Indiana">Indiana</option>
                            <option value="Iowa">Iowa</option>
                            <option value="Kansas">Kansas</option>
                            <option value="Kentucky">Kentucky</option>
                            <option value="Louisiana">Louisiana</option>
                            <option value="Maine">Maine</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Maryland">Maryland</option>
                            <option value="Massachusetts">Massachusetts</option>
                            <option value="Michigan">Michigan</option>
                            <option value="Minnesota">Minnesota</option>
                            <option value="Mississippi">Mississippi</option>
                            <option value="Missouri">Missouri</option>
                            <option value="Montana">Montana</option>
                            <option value="Nebraska">Nebraska</option>
                            <option value="Nevada">Nevada</option>
                            <option value="New Hampshire">New Hampshire</option>
                            <option value="New Jersey">New Jersey</option>
                            <option value="New Mexico">New Mexico</option>
                            <option value="New York">New York</option>
                            <option value="North Carolina">North Carolina</option>
                            <option value="North Dakota">North Dakota</option>
                            <option value="Ohio">Ohio</option>
                            <option value="Oklahoma">Oklahoma</option>
                            <option value="Oregon">Oregon</option>
                            <option value="Pennsylvania">Pennsylvania</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Rhode Island">Rhode Island</option>
                            <option value="South Carolina">South Carolina</option>
                            <option value="South Dakota">South Dakota</option>
                            <option value="Tennessee">Tennessee</option>
                            <option value="Texas">Texas</option>
                            <option value="Utah">Utah</option>
                            <option value="Vermont">Vermont</option>
                            <option value="Virgin Island">Virgin Island</option>
                            <option value="Virginia">Virginia</option>
                            <option value="Washington">Washington</option>
                            <option value="West Virginia">West Virginia</option>
                            <option value="Wisconsin">Wisconsin</option>
                            <option value="Wyoming">Wyoming</option>
                        </select>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="date">Date:</label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <input name="date" type="date" className="form-control" placeholder="MM/DD/YYYY MM:HH"></input>
                    </div>
                </div>
                <h2>Weather conditions</h2>
                <hr></hr>
                <div className="row form-group">
                    <div className="col col-12 col-sm-3 w-100">
                        <input type="radio" id="hail" value="Hail" name="precipitation" />
                        <label htmlFor="hail" >Hail</label>
                    </div>
                    <div className="col col-12 col-sm-3 w-100">
                        <input type="radio" value="Snow" id="snow" name="precipitation" />
                        <label htmlFor="snow" >Snow</label>
                    </div>
                    <div className="col col-12 col-sm-3 w-100">
                        <input type="radio" value="Rain" id="rain" name="precipitation" />
                        <label htmlFor="rain" >Rain</label>
                    </div>
                    <div className="col col-12 col-sm-3 w-100">
                        <input type="radio" value="Clear" id="clear" name="precipitation"/>
                        <label htmlFor="clear">Clear</label>
                    </div>
                </div>
                <hr></hr>
                <div className="row form-group">
                    <div className="col col-12 col-sm-6 w-100">
                        <input type="checkbox" name="fog" id="fog"/>
                        <label htmlFor="fog">Fog</label>
                    </div>
                    <div className="col col-12 col-sm-6 w-100">
                        <input type="checkbox" name="wind" id="wind"/>
                        <label htmlFor="wind">High Winds</label>
                    </div>
                </div>
                <hr></hr>
            </form>
            <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
        </div>


    )


}

export default SubmitAccident;
