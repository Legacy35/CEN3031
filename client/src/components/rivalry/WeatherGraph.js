import React, { useState } from 'react';
import {Bar} from 'react-chartjs-2';

const WeatherGraph = (props) => {

    let [city1name, setCity1Name] = useState("Orlando");
    let [city1data, setCity1Data] = useState([3,7,4,14]);
    let [city2name, setCity2Name] = useState("Chicago");
    let [city2data, setCity2Data] = useState([4,3,5,12]);


    let [chartData, setChartData] = useState({
        labels: ["Week", "Month", "Year", "Overall"],
        datasets: [
            {
                label: city1name,
                backgroundColor: "green",
                data: city1data
            },
            {
                label: city2name,
                backgroundColor: "orange",
                data: city2data
            },
        ]
    });

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

export default WeatherGraph;
