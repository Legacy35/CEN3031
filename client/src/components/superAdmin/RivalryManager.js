import React, { useState } from 'react';
import axios from 'axios';

const RivalryManager = (props) => {

    let [rivalries, setRivalries] = useState([]);

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


    return (
        <div>
            <hr />
            <form id="formRivalrySearch" className="row w-100">
                <div className="col col-12 col-md-3">
                    <label htmlFor="city">City name: </label>
                </div>
                <div className="col col-12 col-md-9">
                    <input className="form-control" name="cityName" type="text" placeholder="Miami"></input>
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
                        </tr>
                    </thead>
                    {
                        rivalries.map((rivalry, i) => (
                            <tbody key={i}>
                                <tr>
                                    <td>{rivalry.city1.name}, {rivalry.city1.state}</td>
                                    <td>{rivalry.city2.name}, {rivalry.city2.state}</td>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
        </div>

    );

}

export default RivalryManager;
