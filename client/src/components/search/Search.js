/**
 * Author: Joshua G
 */

import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const Search = (props) => {

  const [filterText, setFilterText] = useState('');

  const filterUpdate = (value) => {
    let d = document.getElementById("select_id").value;
    setFilterText(d);
  }

  return (
    <div>
      <SearchBar filterText={filterText} filterUpdate={filterUpdate} />
      <Form /*Stuff here...*/ ></Form>
    </div>
  );

}

export default Search; 