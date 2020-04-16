import React from 'react';
import CitySummary from './CitySummary.js';

const SearchResults = (props) => {

    //Value used for the key property for rendered elements
    let i = 0;
    let cities = props.cities;

    console.log(props);

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
                            <tbody key={i++}> {/*Increment at the start of the login to avoid duplicate keys*/}
                                <tr key={i} data-toggle="collapse" data-target={".order" + i}>
                                    <th scope="row" >{i}</th>
                                    <td>{element.name}</td>
                                    <td>{element.state}</td>
                                    <td>{element.coordinates.latitude}</td>
                                    <td>{element.coordinates.longitude}</td>
                                    <td>{element.accidents.length}</td>
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
