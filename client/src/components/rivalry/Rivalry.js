import React, { useState } from 'react';
import RivalrySearchBar from './RivalrySearchBar.js'
import RivalryTable from './RivalryTable.js';
import RivalryGraph from './RivalryGraph.js';

const Rivalry = (props) => {

  const [rivalries, setRivalries] = useState(null);
  const [selectedRivalry, setSelectedRivalry] = useState(null);

  return (
    <div>
      <RivalrySearchBar selectedRivalry={selectedRivalry} setSelectedRivalry={setSelectedRivalry} rivalries={rivalries} setRivalries={setRivalries}/>
      <br />
      <RivalryTable selectedRivalry={selectedRivalry} setSelectedRivalry={setSelectedRivalry} rivalries={rivalries} setRivalries={setRivalries}/>
      <RivalryGraph selectedRivalry={selectedRivalry} setSelectedRivalry={setSelectedRivalry} rivalries={rivalries} setRivalries={setRivalries}/>
    </div>
  );

};

export default Rivalry;
