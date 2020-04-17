import React from 'react';

const RivalryTableRow = (props) => {

    const onClick = () => {
        props.setSelectedRivalry(props.rivalry);
    }
    return (
        <tr key={props.key} id={"city-" + props.key} data-toggle="collapse" data-target={".order" + props.key} onClick={onClick}>
            <td scope="row">{props.rivalry.city1.name+", "+props.rivalry.city1.state}</td>
            <td>{props.rivalry.city2.name+", "+props.rivalry.city2.state}</td>
            <td><button className="btn btn-primary" onClick={onClick}style={{float: 'right'}}>Add to graph</button></td>
        </tr>
    );

}

export default RivalryTableRow;
