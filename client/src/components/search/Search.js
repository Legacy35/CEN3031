/**
 * Author: Joshua G
 */

import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const Search = (props) => {

  const [filterText, setFilterText] = useState('');

  const filterUpdate = (value) => {
    var d = document.getElementById("select_id").value;
    setFilterText(d);
  }

  return (
    <SearchBar filterText={filterText} filterUpdate={filterUpdate} />
  );

}

export default Search; 
