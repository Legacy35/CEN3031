/**
 * Author: Joshua G, Cameron W
 */

import React, { useState } from 'react';
import CompareSearchForm from '../../components/search/CompareSearchForm.js';
import GraphTab from './GraphTab.js';

const Compare = (props) => {
  
  let [cities, setCities] = useState([]);
  
  return (
      <div>
    <p>Search for a City</p>
    <CompareSearchForm setCities={setCities}/>
    <GraphTab cities={cities}/>
    <CompareSearchForm />
    </div>
  );

}

export default Compare; 