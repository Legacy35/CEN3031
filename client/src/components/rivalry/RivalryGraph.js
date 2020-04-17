import React, {
  useState
} from 'react';
import {
  Bar
} from 'react-chartjs-2';
import axios from 'axios';

const RivalryGraph = (props) => {

  let [max, setMax] = useState(1);
  let [lastInfo, setlastInfo] = useState(null);

  const loadData = () => {
    let newChartData = {};
    newChartData["labels"] = ["Total", "No Percipitation", "Rain", "Snow", "Hail", "Fog", "High Winds"];
    newChartData["datasets"] = [];
    let maximum = props.selectedRivalry.city1.accidents.length > props.selectedRivalry.city2.accidents.length ? props.selectedRivalry.city1.accidents.length : props.selectedRivalry.city2.accidents.length;
    setMax(maximum);
    let datapoint = {};
    datapoint["label"] = props.selectedRivalry.city1.name;
    datapoint["backgroundColor"] = "orange"; //"blue"
    datapoint["data"] = [props.selectedRivalry.city1.accidents.length, 0, 0, 0, 0, 0, 0];
    props.selectedRivalry.city1.accidents.forEach((accident) => {
      accident.weather.forEach((weather) => {
        if (weather.toLowerCase() == "clear") datapoint.data[1]++;
        if (weather.toLowerCase() == "rainy") datapoint.data[2]++;
        if (weather.toLowerCase() == "snowy") datapoint.data[3]++;
        if (weather.toLowerCase() == "hail") datapoint.data[4]++;
        if (weather.toLowerCase() == "foggy") datapoint.data[5]++;
        if (weather.toLowerCase() == "windy") datapoint.data[6]++;
      });
    });
    newChartData.datasets.push(datapoint);
    let datapoint2 = {};
    datapoint2["label"] = props.selectedRivalry.city2.name;
    datapoint2["backgroundColor"] = "blue"; //"blue"
    datapoint2["data"] = [props.selectedRivalry.city2.accidents.length, 0, 0, 0, 0, 0, 0];
    props.selectedRivalry.city2.accidents.forEach((accident) => {
      accident.weather.forEach((weather) => {
        if (weather.toLowerCase() == "clear") datapoint2.data[1]++;
        if (weather.toLowerCase() == "rainy") datapoint2.data[2]++;
        if (weather.toLowerCase() == "snowy") datapoint2.data[3]++;
        if (weather.toLowerCase() == "hail") datapoint2.data[4]++;
        if (weather.toLowerCase() == "foggy") datapoint2.data[5]++;
        if (weather.toLowerCase() == "windy") datapoint2.data[6]++;
      });
    });
    console.log(newChartData);
    newChartData.datasets.push(datapoint2);
    console.log(newChartData);
//  setLoaded(true);
    props.setChartData(newChartData);
  };

  if (props.selectedRivalry) {
    if(props.selectedRivalry!=lastInfo){
    loadData();
    setlastInfo(props.selectedRivalry);
  }
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

  if (props.selectedRivalry) {
    return (<div className="graph">
      <Bar data={props.chartData} options={options}/> </div>)
  } else {
    return (<p></p>);
  }

}

export default RivalryGraph;
