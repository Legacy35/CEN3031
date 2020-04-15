import React, { useState } from 'react';
import {Bar} from 'react-chartjs-2';

const GraphTab = (props) => {

    //set these states when a rivalry is clicked to change cities being displayed, you will need the city's name and its data
    //data needs to be calculated
    //something like ... setCity1Name(props.rivalries.city1id.name)

    let [city1name, setCity1Name] = useState("City 1");
    let [city1data, setCity1Data] = useState([0,0,0,0]);
    let [city2name, setCity2Name] = useState("City 2");
    let [city2data, setCity2Data] = useState([0,0,0,0]);

    let [chartData, setChartData] = useState({
        labels: ["Week", "Month", "Year", "Overall"],
        datasets: [
            {
                label: city1name, 
                backgroundColor: "blue",
                data: city1data
            },
            {
                label: city2name,
                backgroundColor: "red",
                data: city2data
            },
        ]
    });

    //make scalable based on max # of accidents, See: https://www.chartjs.org/docs/latest/axes/cartesian/linear.html#axis-range-settings
    let options = {
      scales: {
          yAxes: [{
              ticks: {
                  max: 20,
                  min: 0,
                  stepSize: 1,
              },
              scaleLabel:{
                display: true,
                labelString: 'Number of Accidents'
              },
          }]
      }
  };

        return (
            <div className="graph">
              <Bar data={chartData} options={options}/>
            </div>
        );
};

export default GraphTab;
