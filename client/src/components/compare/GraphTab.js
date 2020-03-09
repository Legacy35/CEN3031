import React, { useState } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

const GraphTab = (props) => {

    let [chartData, setChartData] = useState({
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[
            {
              label:'Number of Crashes',
              data:[
                617594,
                181045,
                153060,
                106519,
                105162,
                95072
              ],
              backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ]
            }
          ]

    });

        return (
            <div className="graph">
              <em>
                Our goal is to recognize and commend the safest cities across the United States. 
                By comparing the number of accidents in each city, we can determine which cities have the safest drivers. 
                Cities are ranked based on several factors including population, accidents per day, and climate, among others
                that can affect safe driving in a city.
              </em>
              <Bar data={chartData}/>
            </div>
        );
}

export default GraphTab;