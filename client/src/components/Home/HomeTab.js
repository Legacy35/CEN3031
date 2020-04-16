import React, {
  useState
} from 'react';
import {
  Bar
} from 'react-chartjs-2';
import axios from 'axios';

const HomeTab = (props) => {

  let [loaded, setloaded] = useState(false);
  let [cities, setcities] = useState([]);
  let [max, setMax] = useState(1);
  let [chartData, setChartData] = useState([]);
  let colors = ["blue", "red", "green", "orange", "pink"];

  const loadData = () => {
    let newChartData = {};
    newChartData["labels"] = ["Total", "No Percipitation", "Rain", "Snow","Hail","Fog","High Winds"];
    newChartData["datasets"] = [];
    axios.get('/apis/cities/city.php?limit=100&filter=').then(
      (res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          let count = 0;
          let rate = .5;
          res.data.forEach((city) => {
            let rnd =Math.random();
            if(count>4||city.accidents.length==0||rnd<rate) return;
            rate -= .1;
            let datapoint = {};
            datapoint["label"] = city.name;
            datapoint["backgroundColor"] = colors[count++];
            datapoint["data"] = [city.accidents.length, 0, 0, 0, 0, 0 ,0];
            if(max <= city.accidents.length)setMax(city.accidents.length+3);
            city.accidents.forEach((accident) => {

              accident.weather.forEach((weather) => {
                if (weather.toLowerCase()=="clear") datapoint.data[1]++;
                if (weather.toLowerCase()=="rainy") datapoint.data[2]++;
                if (weather.toLowerCase()=="snowy") datapoint.data[3]++;
                if (weather.toLowerCase()=="hail") datapoint.data[4]++;
                if (weather.toLowerCase()=="foggy") datapoint.data[5]++;
                if (weather.toLowerCase()=="windy") datapoint.data[6]++;
              }
            );

            });
            newChartData.datasets.push(datapoint);
          });
        setChartData(newChartData);
        console.log(newChartData);

        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  if (!loaded) {
    setloaded(true);
    loadData();
  }

  //make scalable based on max # of accidents, See: https://www.chartjs.org/docs/latest/axes/cartesian/linear.html#axis-range-settings
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

  return (
  <div className="graph" >
    <em >Our goal is to foster a competitive spirit for safe driving practices between individuals and cities. Watch as cities compete against each other in rivalries to determine who has the safest drivers, or practice your own driver saftey skills by taking a customized driving quiz for your state! Keep driving safe!</em>
    <Bar data = { chartData } options = {options}/>
  </div>
  );
}

export default HomeTab;
