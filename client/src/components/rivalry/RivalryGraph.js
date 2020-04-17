import React, {
  useState
} from 'react';
import {
  Bar
} from 'react-chartjs-2';
import axios from 'axios';

const RivalryGraph = (props) => {
  let [loaded, setloaded] = useState(false);
  let [cities, setcities] = useState([]);
  let [max, setMax] = useState(1);
  let [chartData, setChartData] = useState([]);

  const loadData = () => {
    let newChartData = {};
    newChartData["labels"] = ["Total", "No Percipitation", "Rain", "Snow","Hail","Fog","High Winds"];
    newChartData["datasets"] = [];
    let maximum= props.selectedRivalry.city1.accidents.length > props.selectedRivalry.city2.accidents.length ? props.selectedRivalry.city1.accidents.length: props.selectedRivalry.city2.accidents.length;
    let datapoint = {};
    datapoint["label"] = props.selectedRivalry.city1.city.name;
    datapoint["backgroundColor"] = "orange"; //"blue"
    datapoint["data"] = [props.selectedRivalry.city1.accidents.length, 0, 0, 0, 0, 0 ,0];
    props.selectedRivalry.city1.accidents.forEach((accident) => {
      accident.weather.forEach((weather) => {
        if (weather.toLowerCase()=="clear") datapoint.data[1]++;
        if (weather.toLowerCase()=="rainy") datapoint.data[2]++;
        if (weather.toLowerCase()=="snowy") datapoint.data[3]++;
        if (weather.toLowerCase()=="hail") datapoint.data[4]++;
        if (weather.toLowerCase()=="foggy") datapoint.data[5]++;
        if (weather.toLowerCase()=="windy") datapoint.data[6]++;
      });
    });
    newChartData.datasets.push(datapoint);
    datapoint = {};
    datapoint["label"] = props.selectedRivalry.city1.city.name;
    datapoint["backgroundColor"] = "orange"; //"blue"
    datapoint["data"] = [props.selectedRivalry.city1.accidents.length, 0, 0, 0, 0, 0 ,0];
    props.selectedRivalry.city1.accidents.forEach((accident) => {
      accident.weather.forEach((weather) => {
        if (weather.toLowerCase()=="clear") datapoint.data[1]++;
        if (weather.toLowerCase()=="rainy") datapoint.data[2]++;
        if (weather.toLowerCase()=="snowy") datapoint.data[3]++;
        if (weather.toLowerCase()=="hail") datapoint.data[4]++;
        if (weather.toLowerCase()=="foggy") datapoint.data[5]++;
        if (weather.toLowerCase()=="windy") datapoint.data[6]++;
      });
    });
    newChartData.datasets.push(datapoint);
    setChartData(newChartData);
  }
  let options = {
      scales: {
      yAxes: [{
        ticks: {
        max: max,
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
if(!loaded){loadData()};
      if(props.rivalries && props.cities){
          return <div className="graph" >
            <Bar data = { chartData } options = {options}/>
          </div>
            } else {
          return <em >Sumting wong, we-to lo , holy fuke, Bang-ding owe</em>;
      }

}

export default RivalryGraph;
