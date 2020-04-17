import React from 'react';
import RivalryTableRow from './RivalryTableRow.js';

const RivalryTable = (props) => {

    //Value used for the key property for rendered elements
    let i = 1;
    let rivalries = props.rivalries;
    console.log(rivalries);



        return (
            <div className="table-responsive nopadding nomargin">
                <table className="table table-striped table-dark table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col">City 1</th>
                            <th scope="col">City 2</th>
                        </tr>
                    </thead>
                    { props.rivalries && 
                        rivalries.map((element => (
                            <tbody key={i++}>
                                <RivalryTableRow rivalries={props.rivalries} setRivalries={props.setRivalries} key={i} rivalry={element}/>
                            </tbody>
                        ))) 
                    }   
                </table>
                {props.rivalries && props.rivalries.length == 0 && <p>No results found.</p>}
            </div>
        );


}

export default RivalryTable;
