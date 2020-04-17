import React, { useState } from 'react';
import RivalrySearchBar from './RivalrySearchBar.js'
import RivalryTable from './RivalryTable.js';
import RivalryGraph from './RivalryGraph.js';

const Rivalry = (props) => {

  let [rivalries, setRivalries] = useState(null);
  let [selectedRivalry, setSelectedRivalry] = useState(null);
  let [chartData, setChartData] = useState([]);

  return (
    <div>
      <RivalrySearchBar selectedRivalry={selectedRivalry} setSelectedRivalry={setSelectedRivalry} rivalries={rivalries} setRivalries={setRivalries}/>
      <br />
      <RivalryTable selectedRivalry={selectedRivalry} setSelectedRivalry={setSelectedRivalry} rivalries={rivalries} setRivalries={setRivalries}/>
      <RivalryGraph chartData={chartData} setChartData={setChartData} selectedRivalry={selectedRivalry} setSelectedRivalry={setSelectedRivalry} rivalries={rivalries} setRivalries={setRivalries}/>
    </div>
  );

};

export default Rivalry;
