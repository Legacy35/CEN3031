import React from 'react';

import axios from 'axios';

const RivalryManagerTableRow = (props) => {

    const onClick = (evt) => {
        axios.post('/apis/rivalries/rivalry.php', {id: props.rivalry.id, delete: true})
        .then((res) => {
            if(res.data.error) {
                alert(res.data.error);
            } else {
                props.loadRivalries();
            }
        })
    }

    return (
        <tbody key={props.key}>
            <tr>
                <td>{props.rivalry.city1.name}, {props.rivalry.city1.state}</td>
                <td>{props.rivalry.city2.name}, {props.rivalry.city2.state}</td>
                <td><button className="btn btn-danger" style={{float: 'right'}} onClick={onClick}>Delete</button></td>
            </tr>
        </tbody>
    );

}

export default RivalryManagerTableRow;