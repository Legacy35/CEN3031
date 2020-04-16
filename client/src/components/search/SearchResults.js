import React, {useState,useEffect} from 'react';
import { Component } from "react";
import CitySummary from './CitySummary.js';

const SearchResults = (props) => {

    //Value used for the key property for rendered elements
    let i = 0;


    const [selectedCity, setSelectedCity] = useState('');


    const show = () =>
    {
            alert(this.selectedCity);
    };


    let  cities=props.cities ?[...props.cities] : []
    cities.forEach((city) => {
    let  datapoint = [city.accidents.length, 0, 0, 0, 0, 0 ,0];
    city.accidents.forEach((accident) => {
      accident.weather.forEach((weather) => {
        if (weather.toLowerCase()=="clear") datapoint[1]++;
        else if (weather.toLowerCase()=="rainy") datapoint[2]++;
        else if (weather.toLowerCase()=="snowy") datapoint[3]++;
        else if (weather.toLowerCase()=="hail") datapoint[4]++;
        else if (weather.toLowerCase()=="foggy") datapoint[5]++;
        else if (weather.toLowerCase()=="windy") datapoint[6]++;
        else{
          alert(weather.toLowerCase());
        }
      });
    });
    city["data"]=datapoint;
  });
    if (cities == undefined) {
        return (
            <div className="table-responsive nopadding nomargin">
                <table className="table table-striped table-dark table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col">Latitude</th>
                            <th scope="col">Longitude</th>
                            <th scope="col">Climate</th>
                            <th scope="col">Number of Accidents</th>
                        </tr>
                    </thead>
                </table>
                <p>Make a Search Using the above filters</p>
            </div>
        );
    }

    if (cities.length) {

        return (

            <div className="table-responsive nopadding nomargin">

                <table className="table table-striped table-dark table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col">Latitude</th>
                            <th scope="col">Longitude</th>
                            <th scope="col">Number of Accidents</th>
                        </tr>
                    </thead>
                    {
                        cities.map((element => (
                          <tbody>

                         <tr key={i}   data-toggle="collapse" data-target= {".order" + i}>
                             <th scope="row" >{i++}</th>
                                    <td>{element.name}</td>
                                    <td>{element.state}</td>
                                    <td>{element.coordinates.latitude}</td>
                                    <td>{element.coordinates.longitude}</td>
                                    <td>{element.accidents.length}</td>

                                </tr>
                                <tr class= {"collapse order" + (i-1).toString()} style = {{background: "dark_grey"}}>
                                <td>
                                </td>
                                <td>
                                    Total Accidents: {element.data[0]}
                                </td>
                         </tr>
                         <tr class= {"collapse order" + (i-1).toString()} style = {{background: "dark_grey"}}>
                                <td>
                                </td>
                                <td>
                                    Accidents with No Percipitation: {element.data[1]}
                                </td>
                         </tr>
                         <tr class= {"collapse order" + (i-1).toString()} style = {{background: "dark_grey"}}>
                                <td>
                                </td>
                                <td>
                                    Accidents in Rain: {element.data[2]}
                                </td>
                         </tr>
                         <tr class= {"collapse order" + (i-1).toString()} style = {{background: "dark_grey"}}>
                                <td>
                                </td>
                                <td>
                                    Accidents in Snow: {element.data[3]}
                                </td>
                         </tr>
                         <tr class= {"collapse order" + (i-1).toString()} style = {{background: "dark_grey"}}>
                                <td>
                                </td>
                                <td>
                                    Accidents in Hail: {element.data[4]}
                                </td>
                         </tr>
                         <tr class= {"collapse order" + (i-1).toString()} style = {{background: "dark_grey"}}>
                                <td>
                                </td>
                                <td>
                                    Accidents in Fog: {element.data[5]}
                                </td>
                         </tr>
                         <tr class= {"collapse order" + (i-1).toString()} style = {{background: "dark_grey"}}>
                                <td>
                                </td>
                                <td>
                                    Accidents in Wind: {element.data[6]}
                                </td>
                         </tr>
                       </tbody>
                        )))

                    }


                </table>
            </div>
        );
    } else {

        return (
            <div className="table-responsive nopadding nomargin">
                <table className="table table-striped table-dark table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col">Latitude</th>
                            <th scope="col">Longitude</th>
                            <th scope="col">Climate</th>
                            <th scope="col">Number of Accidents</th>

                        </tr>
                    </thead>
                </table>
                <p>No results found.</p>
            </div>
        );

    }

}

export default SearchResults;
