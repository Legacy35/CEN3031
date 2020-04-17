import React from 'react';

const RivalryTableRow = (props) => {

    const onClick = () => {
        
    }

    return (
        <tr key={props.key} id={"city-" + props.key} data-toggle="collapse" data-target={".order" + props.key} onClick={onClick}>
            <td scope="row">{props.rivalry.city1.name}</td>
            <td>{props.rivalry.city2.name}</td>
        </tr>
    );

}

export default RivalryTableRow;