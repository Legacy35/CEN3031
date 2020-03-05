/**
 * Author: Joshua G
 */

import React from 'react';

const SearchBar = (props) => {

  const clicked = () => 
  {
     alert(props.filterText);
     };

return (

  <form>
  <input type="text" autoComplete = "off" placeholder="Type to Filter" id = "select_id" onChange =  {props.filterUpdate} />
  <input type = "button" onClick =  {clicked}/>
  <p></p>
</form>
);

}

export default SearchBar; 