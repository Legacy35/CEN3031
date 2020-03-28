import React, {useState,useEffect} from 'react';

import { Component } from "react";

const SearchResults = (props) => {

    let i = 1;
 

    const [selectedCity, setSelectedCity] = useState('');


    const show = () =>
    {
            alert(this.selectedCity);
    };


    let cities = props.cities;

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
                        <th scope="col">Climate</th>
                        <th scope="col">Number of Accidents</th>
                    </tr>
                </thead>
              
                    {
                        cities.map((element => (
                              
                     <tbody>
                         
                            <tr key={i}   data-toggle="collapse" data-target= {".order" + i}>
                                <th scope="row" >{i++}</th>
                                {}
                                <td>{element.name}</td>
                                <td>{element.state}</td>
                                <td>{element.coordinates.latitude}</td>
                                <td>{element.coordinates.longitude}</td>
                                <td>{element.climate ? element.climate : "N/A"}</td>
                                <td>{element.accidents.length}</td>
                                <td>&gt;</td>
                            </tr>
                            <tr class= {"collapse order" + (i-1).toString()} style = {{background: "black"}}>
                                <td>
                                </td>
                                <td>
                                    Accident breakdown:
                                </td>
                         </tr>
                         <tr class= {"collapse order" + (i-1).toString()} style = {{background: "black"}}>
                                <td>
                                </td>
                                <td>
                                    Rainy Accidents:
                                </td>
                         </tr>
                         <tr class= {"collapse order" + (i-1).toString()} style = {{background: "black"}}>
                                <td>
                                </td>
                                <td>
                                    Snow Accidents:
                                </td>
                         </tr>
                         <tr class= {"collapse order" + (i-1).toString()} style = {{background: "black"}}> 
                                <td>
                                </td>
                                <td>
                                    Fog Accidents:
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