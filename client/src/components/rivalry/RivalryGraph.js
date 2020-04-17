import React from 'react';
import Rivalry from './Rivalry';
import Bar from 'react-chartjs-2';

const RivalryGraph = (props) => {

    const getMax = () => {
        let output = 0;
        if(!props.rivalries) return 0;
        props.rivalries.forEach((rivalry) => {

        });
    }

    let options = {
        scales: {
          yAxes: [{
            ticks: {
              max: getMax(),
              min: 0,
              stepSize: 1,
            },
            scaleLabel: {
              display: true,
              labelString: 'Number of Accidents'
            },
          }]
        }
      };

      let chartData = {
          labels: ["Total", "Clear", "Rain", "Snow","Hail","Fog","High Winds"],
          datasets: []
      };

      if(props.rivalries){
          props.rivalries.forEach((rivalry) => {

          });
      }

      if(!props.rivalries || !props.cities){
          return <p>After searching for a city, its rivals and their stats will be displayed here as a graph.</p>
      } else {
        
      }

}

export default RivalryGraph;