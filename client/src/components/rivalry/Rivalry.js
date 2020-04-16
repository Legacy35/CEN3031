import React, { useState } from 'react';
import RivalrySearchBar from './RivalrySearchBar.js'
import RivalryTable from './RivalryTable.js';
import RivalryGraph from './RivalryGraph.js';

const Rivalry = (props) => {

  const [rivalries, setRivalries] = useState(null);
  const [cities, setCities] = useState(null);

  return (
    <div>
      <RivalrySearchBar cities={cities} setCities={setCities} rivalries={rivalries} setRivalries={setRivalries}/>
      <br />
      <RivalryTable cities={cities} setCities={setCities} rivalries={rivalries} setRivalries={setRivalries}/>
      <RivalryGraph cities={cities} setCities={setCities} rivalries={rivalries} setRivalries={setRivalries}/>
    </div>
  );

};

export default Rivalry;
