import React from 'react'
import { logout } from '../SessionManager.js';
import { Line } from 'react-chartjs-2';
import UpdateAccountInfo from './UpdateAccountInfo.js';

const UserSummary = (props) => {

  if (!props.userData.quizScores) return (<p>Loading...</p>)

  const onClick = () => {
    logout(props.views, props.setViews, props.setUserData);
  }

  let labels = [];
  for (let i = 0; i < props.userData.quizScores.length; i++) {
    let quizNum = i + 1;
    labels[i] = ("Quiz " + (quizNum));
  }

  let chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Score',
        lineTension: 0.0,
        fill: false,
        data: props.userData.quizScores,
        backgroundColor: [
          'rgba(0, 0, 0, 1.0)'
        ],
        borderColor: [
          'rgba(255,0,0,0.6)'
        ],
      }
    ]
  };

  let i = 1;

  return (
    <div>
      <h2>Welcome, <em>{props.userData.first_name}</em></h2>
      <hr/>

      <UpdateAccountInfo userData={props.userData} setUserData={props.setUserData} views={props.views} setViews={props.setViews}/>

      <hr/>

      <div className="graph">
        <h3>
          Previous Quiz Scores
              </h3>
        <Line data={chartData} />
      </div>


      <button className="btn btn-primary" onClick={onClick}>Log out</button>
    </div>
  );

}

export default UserSummary;
