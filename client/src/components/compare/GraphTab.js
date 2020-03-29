import React, { useState } from 'react';
import {Line} from 'react-chartjs-2';

const GraphTab = (props) => {

    let [chartData, setChartData] = useState({
      labels: [0, 1000, 5000, 10000, 20000, 50000, 100000],
      datasets: [
        {
          label: 'Number of Accidents',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    });

        let options = {
          scales: {
              yAxes: [{
                  ticks: {
                      max: 85,
                      min: 0,
                      stepSize: 5
                  }
              }]
          },
      };

        return (
            <div className="graph">
              <em>
                Our goal is to recognize and commend the safest cities across the United States.
                By comparing the number of accidents in each city, we can determine which cities have the safest drivers.
                Cities are ranked based on several factors including population, accidents per day, and climate, among others
                that can affect safe driving in a city.
              </em>
              <Line data={chartData} options={options}/>
            </div>
        );
}

export default GraphTab;
