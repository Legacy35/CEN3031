import React, { useState } from 'react';
import {Line} from 'react-chartjs-2';

const GraphTab = (props) => {

    let [chartData, setChartData] = useState({
      labels: ['Bakersfield', 'Chicago', 'Gainesville', 'Los Angeles', 'Miami'],
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
          data: [3,1,1,1,0]
        }
      ]
    });

        let options = {
          scales: {
              yAxes: [{
                  ticks: {
                      max: 5,
                      min: 0,
                      stepSize: 1,
                  }
              }]
          },
      };

        return (
            <div className="graph">
              <em>
                Our goal is to foster a competitive spirit for safe driving practices between individuals and cities. Watch as cities compete against each other in rivalries to determine who has the safest drivers, or practice your own driver saftey skills by taking a customized driving quiz for your state! Keep driving safe!
              </em>
              <Line data={chartData} options={options}/>
            </div>
        );
}

export default GraphTab;
