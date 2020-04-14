import React from 'react';
import CitySummary from './CitySummary.js';

const SearchResults = (props) => {

    //Value used for the key property for rendered elements
    let i = 0;
    let cities = props.cities;
    let snow = 0;
    let fog = 0;
    let rain = 0;
    let wind = 0;

    function myFunction(item)
    {
        if(item.localeCompare("snow"))
            snow++;
         
    }

    function handleClickEvent(event) 
    {
        let start = "";
        
       let count = 0;
       if(event)
       {
        event.map((accident) => (
                 start += accident.weather.toString(),                   
                 start += ",",
                 count++
                 ))
       
       var nameArr = event.split(',');
       nameArr.forEach(myFunction);
        }
       return count;
    }
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
                            <th scope = "col">{handleClickEvent()}</th>
                        </tr>
                    </thead>
                </table>
                <p>Making a Search Using the above filters</p>
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
                            <tbody key={i++}> {/*Increment at the start of the login to avoid duplicate keys*/}
                                <tr key={i} data-toggle="collapse" data-target={".order" + i}>
                                    <th scope="row" >{i}</th>
                                    <td>{element.name}</td>
                                    <td>{element.state}</td>
                                    <td>{element.coordinates.latitude}</td>
                                    <td>{element.coordinates.longitude}</td>
                                    <td>{element.accidents.length}</td>
                                </tr>
                                <span className={"collapse col-md-100 w-100 row order" + i} style={{ padding: '15px'}} colspan = "10">
                                    {
                                    

                                        <div>{handleClickEvent(element)}</div>
                                      
                                     
                                    }

                                </span>
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
