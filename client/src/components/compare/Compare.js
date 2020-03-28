/**
 * Author: Joshua G, Cameron W
 */

import React, { useState } from 'react';
import SearchForm from '../../components/search/SearchForm.js';
import GraphTab from './GraphTab.js';

const Compare = (props) => {
  
  let [cities, setCities] = useState([]);

  return (
      <div>
    <p>asdfasdf</p>
    <SearchForm setCities={setCities}/>
    <GraphTab cities={cities}/>
    </div>
  );

}

export default Compare; 