import React from 'react'
import axios from 'axios';
import queryString from 'querystring'

const RivalrySearchBar = (props) => {

    const onClick = (event) => {

        event.preventDefault();

        let form = document.getElementById("formSearchRivalries");
        let cityName = form.cityName.value;

        axios.get('/apis/rivalries/rivalry.php?limit=5&filter=' + cityName).then(
            (res) => {
              if(res.data.error){
                alert(res.data.error);
              } else {
                props.setRivalries(res.data);
                res.data.forEach((rivalry) => {

                });
              }
            }
          ).catch((err) => {
            if(err) console.log(err);
          })
    };

    return (
        <div>
            <form id="formSearchRivalries">
              <div className="form-group row">
                <div className="col col-3">
                  <label htmlFor="cityName">City name:</label>
                </div>
                <div className="col col-9">
                  <input name="cityName" type="text" className="form-control" placeholder="Enter city name here"/>
                </div>
              </div>
              <button className="btn btn-primary" onClick={onClick}>Search</button>
            </form>
        </div>
    );

};

export default RivalrySearchBar;
