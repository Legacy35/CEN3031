/**
 * Author: Joshua G, Cameron W
 */

import React, { useState } from 'react';
import SearchForm from './SearchForm.js'
import SearchResults from './SearchResults';

const Search = (props) => {

  const [cities, setCities] = useState(undefined);

  const initialize = () => {
    setCities(
      [
        {
          name: "Miami",
          state: "Florida",
          coordinates: {
            latitude: 25.761681,
            longitude: -80.191788
          },
          climate: "Tropical monsoon"
        },
        {
          name: "New York City",
          state: "New York",
          coordinates: {
            latitude: 40.730610,
            longitude: -73.935242
          },
          climate: "Humid continental"
        },
        {
          name: "Los Angeles",
          state: "California",
          coordinates: {
            latitude: 34.052235,
            longitude: -118.243683
          },
          climate: "Mediterranean"
        },
      ]
    );
  }

  if (cities === undefined) {
    initialize();
  }

  return (
    <div>
      <SearchForm setCities={setCities}/>
      <br/>
      <SearchResults cities={cities}/>
    </div>
  );

}

export default Search; 
