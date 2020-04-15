import React, { useState } from 'react';
import RivalrySearchBar from './RivalrySearchBar.js'
import RivalryTable from './RivalryTable.js';
import GraphTab from './GraphTab.js';
import WeatherGraph from './WeatherGraph.js';

const Rivalry = (props) => {

  const [rivalries, setRivalries] = useState(undefined);

  return (
    <div>
      <RivalrySearchBar setRivalries={setRivalries}/>
      <br />
      <RivalryTable rivalries={rivalries}/>
      <br />
      <GraphTab/>
      <br />
      <WeatherGraph/>
    </div>
  );

};

export default Rivalry;