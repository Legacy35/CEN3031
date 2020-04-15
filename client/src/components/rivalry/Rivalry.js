import React, { useState } from 'react';
import RivalrySearchBar from './RivalrySearchBar.js'
import RivalryTable from './RivalryTable.js';
import GraphTab from './GraphTab.js';
import WeatherGraph from './WeatherGraph.js';

const Rivalry = (props) => {

  return (
    <div>
      <RivalrySearchBar/>
      <br />
      <RivalryTable/>
      <br />
      <GraphTab/>
      <br />
      <WeatherGraph/>
    </div>
  );

};

export default Rivalry;