/**
 * Author: Joshua G, Cameron W
 */

import React, { useState } from 'react';
import SearchForm from './SearchForm.js'
import SearchResults from './SearchResults';

const Search = (props) => {

  const [cities, setCities] = useState(undefined);

  return (
    <div>
      <SearchForm setCities={setCities} />
      <br />
      <SearchResults cities={cities} />
    </div>
  );

}

export default Search;
