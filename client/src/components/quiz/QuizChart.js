import React, { useState } from 'react';
import {Line} from 'react-chartjs-2';

const GraphTab = (props) => {

    let [chartData, setChartData] = useState({
        labels: ['3/05/20', '3/07/20', '3/10/20', '3/13/20', '3/20/20', '3/30/20'],
        datasets:[
            {
              label:'Score',
              lineTension: 0.0,
              fill: false,
              data:[
                40,
                60,
                75,
                65,
                80,
                95
              ],
              backgroundColor:[
                'rgba(0, 0, 0, 1.0)'
              ], 
              borderColor: [
                  'rgba(255,0,0,0.6)'
              ]
            }
          ]

    });

        return (
            <div className="graph">
              <h3>
                Previous Quiz Scores
              </h3>
              <Line data={chartData}/>
            </div>
        );
}

export default GraphTab;