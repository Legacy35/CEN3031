import React from 'react';

const SearchResults = (props) => {

    let i = 1;

    let cities = props.cities;

    if (cities.length) {

        return (
            <table className="table table-striped table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">City</th>
                        <th scope="col">State</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Climate</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cities.map((element => (
                            <tr>
                                <th scope="row">{i++}</th>
                                <td>{element.name}</td>
                                <td>{element.state}</td>
                                <td>{element.coordinates.latitude}</td>
                                <td>{element.coordinates.longitude}</td>
                                <td>{element.climate ? element.climate : "N/A"}</td>
                            </tr>
                        )))
                    }
                </tbody>
            </table>
        );
    } else {

        return (
            <div>
                            <table className="table table-striped table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">City</th>
                        <th scope="col">State</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Climate</th>
                    </tr>
                </thead>
            </table>
            <p>No results found.</p>
            </div>
        );

    }

}

export default SearchResults;