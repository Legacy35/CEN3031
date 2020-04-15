import React from 'react';

const RivalryTable = (props) => {

    //Value used for the key property for rendered elements
    let i = 0;
    let cities = props.cities;
    console.log(cities);

    if (cities == undefined) {
        return (
            <div className="table-responsive nopadding nomargin">
                <table className="table table-striped table-dark table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Rivalry #</th>
                            <th scope="col">City 1</th>
                            <th scope="col">City 2</th>
                        </tr>
                    </thead>
                </table>
                <p>Search for a city to find its rivals.</p>
            </div>
        );
    }

    if (cities.length) {

        return (

            <div className="table-responsive nopadding nomargin">

                <table className="table table-striped table-dark table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Rivalry #</th>
                            <th scope="col">City 1</th>
                            <th scope="col">City 2</th>
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
                                    <td>{element.climate ? element.climate : "N/A"}</td>
                                    <td>{element.accidents.length}</td>
                                </tr>

                                {/*Summary*/}
                                <span className={"collapse w-100 row order" + i} style={{ padding: '15px'}}>
                                    {
                                        element.accidents.map((accident) => (
                                            <div className="col col-12">
                                                <p>Date: {new Date(accident.date).toString().substr(0, 15)}</p>
                                        <span>Weather: {accident.weather.toString().replace(',', ', ')}</span>
                                                <hr style={{border: '1px solid white'}}/>
                                            </div>

                                        ))
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
                            <th scope="col">Rivalry #</th>
                            <th scope="col">City 1</th>
                            <th scope="col">City 2</th>
                        </tr>
                    </thead>
                </table>
                <p>No results found.</p>
            </div>
        );

    }

}

export default RivalryTable;
