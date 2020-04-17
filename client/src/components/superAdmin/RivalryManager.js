import React, { useState } from 'react';
import axios from 'axios';

import RivalryManagerTableRow from './RivalryManagerTableRow.js';

const RivalryManager = (props) => {

    let [rivalries, setRivalries] = useState([]);
    let [loaded, setLoaded] = useState(false);

    const loadRivalries = (evt) => {
        if (evt) evt.preventDefault();
        let form = document.getElementById('formRivalrySearch');
        let filter = form ? form.cityName.value : "";

        axios.get('/apis/rivalries/rivalry.php?limit=50&filter=' + filter)
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.error)
                } else {
                    setRivalries(res.data);
                }
            }).catch((err) => {
                throw err;
            });
    }

    const createRivalry = (evt) => {
        if (evt) evt.preventDefault();
        let form = document.getElementById('formCreateRivalry');
        let params = {
            city1: form.city1.value,
            state1: form.state1.value,
            city2: form.city2.value,
            state2: form.state2.value,
        };
        axios.post('/apis/rivalries/rivalry.php', params)
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.error);
                } else {
                    loadRivalries();
                    alert('Rivalry successfully added.');
                }
            })
            .catch((err) => {
                throw err;
            });
    }




    if (!loaded) {
        loadRivalries();
        setLoaded(true);
    }

    return (
        <div>
            <h2>Create a new rivalry</h2>
            <form id="formCreateRivalry" onSubmit={createRivalry}>




                <div className="form-group row">
                    <div className="col col-12 col-md-3">
                        <label htmlFor="city1">First city:</label>
                    </div>
                    <div className="col col-12 col-md-9">
                        <input className="form-control" name="city1" type="text" placeholder="Enter a city name here"></input>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col col-12 col-md-3">
                        <label htmlFor="state1">First city's state:</label>
                    </div>
                    <div className="col col-12 col-md-9">
                        <select name="state1" className="form-control">
                            <option value="Alabama">Alabama</option>
                            <option value="Alaska">Alaska</option>
                            <option value="Arizona">Arizona</option>
                            <option value="Arkansas">Arkansas</option>
                            <option value="California">California</option>
                            <option value="Colorado">Colorado</option>
                            <option value="Connecticut">Connecticut</option>
                            <option value="Delaware">Delaware</option>
                            <option value="Florida">Florida</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Idaho">Idaho</option>
                            <option value="Illinois">Illinois</option>
                            <option value="Indiana">Indiana</option>
                            <option value="Iowa">Iowa</option>
                            <option value="Kansas">Kansas</option>
                            <option value="Kentucky">Kentucky</option>
                            <option value="Louisiana">Louisiana</option>
                            <option value="Maine">Maine</option>
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
                            <option value="Rhode Island">Rhode Island</option>
                            <option value="South Carolina">South Carolina</option>
                            <option value="South Dakota">South Dakota</option>
                            <option value="Tennessee">Tennessee</option>
                            <option value="Texas">Texas</option>
                            <option value="Utah">Utah</option>
                            <option value="Vermont">Vermont</option>
                            <option value="Virginia">Virginia</option>
                            <option value="Washington">Washington</option>
                            <option value="West Virginia">West Virginia</option>
                            <option value="Wisconsin">Wisconsin</option>
                            <option value="Wyoming">Wyoming</option>
                        </select>
                    </div>
                </div>




                <div className="form-group row">
                    <div className="col col-12 col-md-3">
                        <label htmlFor="city2">Second city:</label>
                    </div>
                    <div className="col col-12 col-md-9">
                        <input className="form-control" name="city2" type="text" placeholder="Enter a city name here"></input>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col col-12 col-md-3">
                        <label htmlFor="state1">Second city's state:</label>
                    </div>
                    <div className="col col-12 col-md-9">
                        <select name="state2" className="form-control">
                            <option value="Alabama">Alabama</option>
                            <option value="Alaska">Alaska</option>
                            <option value="Arizona">Arizona</option>
                            <option value="Arkansas">Arkansas</option>
                            <option value="California">California</option>
                            <option value="Colorado">Colorado</option>
                            <option value="Connecticut">Connecticut</option>
                            <option value="Delaware">Delaware</option>
                            <option value="Florida">Florida</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Idaho">Idaho</option>
                            <option value="Illinois">Illinois</option>
                            <option value="Indiana">Indiana</option>
                            <option value="Iowa">Iowa</option>
                            <option value="Kansas">Kansas</option>
                            <option value="Kentucky">Kentucky</option>
                            <option value="Louisiana">Louisiana</option>
                            <option value="Maine">Maine</option>
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
                            <option value="Rhode Island">Rhode Island</option>
                            <option value="South Carolina">South Carolina</option>
                            <option value="South Dakota">South Dakota</option>
                            <option value="Tennessee">Tennessee</option>
                            <option value="Texas">Texas</option>
                            <option value="Utah">Utah</option>
                            <option value="Vermont">Vermont</option>
                            <option value="Virginia">Virginia</option>
                            <option value="Washington">Washington</option>
                            <option value="West Virginia">West Virginia</option>
                            <option value="Wisconsin">Wisconsin</option>
                            <option value="Wyoming">Wyoming</option>
                        </select>
                    </div>
                </div>

                <button className="btn btn-primary" onClick={createRivalry}>Create new rivalry</button>






            </form>
            <hr />
            <h2>Search for a rivalry to delete</h2>
            <form id="formRivalrySearch" className="row w-100">
                <div className="col col-12 col-md-3">
                    <label htmlFor="city">City name: </label>
                </div>
                <div className="col col-12 col-md-9">
                    <input className="form-control" name="cityName" type="text" placeholder="Enter a city name here"></input>
                </div>
                <div className="col col-12">
                    <button className="btn btn-primary" onClick={loadRivalries}>Search</button>
                </div>
            </form>
            <br />
            <table className="table table-striped table-dark table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col">City 1</th>
                        <th scope="col">City 2</th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                {
                    rivalries.map((rivalry, i) => (
                        <RivalryManagerTableRow rivalry={rivalry} key={i} loadRivalries={loadRivalries} />
                    ))
                }
            </table>
        </div>

    );

}

export default RivalryManager;
