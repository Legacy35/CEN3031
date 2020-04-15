import React from 'react';

const RivalryTable = (props) => {

    //Value used for the key property for rendered elements
    let i = 0;
    let rivalries = props.rivalries;
    console.log(rivalries);

    if (rivalries == undefined) {
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

    if (rivalries.length) {
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
                        rivalries.map((element => (

                            <tbody key={i++}> {/*Increment at the start of the login to avoid duplicate keys*/}

                                <tr key={i} data-toggle="collapse" data-target={".order" + i}>
                                    <th scope="row" >{i}</th>
                                    <td>{element.city1.name}</td> 
                                    <td>{element.city2.name}</td>
                                </tr>
                            </tbody>
                        ))) //FIX LATER element.##?##.name
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
