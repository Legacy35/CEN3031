/**
 * Author: Joshua G
 */

import React from 'react';

const SearchBar = (props) => {

    const clicked = () => {
        alert(props.filterText);
    };

    return (

        <div>
            <form>
                <input type="text" autoComplete="off" placeholder="Type to Filter" id="select_id" onChange={props.filterUpdate} />
                <p></p>
            </form>
            <input type="button" onClick={clicked} />
        </div>
    );

}

export default SearchBar; 