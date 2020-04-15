import React from 'react'
import axios from 'axios';
import queryString from 'querystring'

const RivalrySearchBar = (props) => {

    const onSubmit = (event) => {
        
        event.preventDefault();

        let usertext = document.getElementById("citynameinput").value;

        axios.get('/apis/rivalries/rivalry.php').then(
            (res) => {
              if(res.data.error){
                alert(res.data.error);
              } else {
                console.log(res.data);
                //do some stuff here
              }
            }
          ).catch((err) => {
            if(err) console.log(err);
          })
    };
    
    return (
        <div>
            <form>
            <label for="citynameinput">
                Enter a City Name: <input type="text" className="form-control" id="citynameinput" />
            </label>
            <button className="btn btn-primary" onClick={onSubmit}>Search</button>
            </form>
        </div>
    );

};

export default RivalrySearchBar;