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
  let options = {
    scales: {
      yAxes: [{
        ticks: {
          max: 100,
          min: 0,
          stepSize: 1,
        },
        scaleLabel: {
          display: true,
          labelString: '% Correct'
        },
      }]
    }
  };
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
  /*
<div>
  <h2>Welcome, <em>{props.userData.first_name}</em></h2>{!props.userData.validated_email &&
  <div className="alert alert-danger row" role="alert">
    <div className="col col-6 col-md-7 col-lg-8 col-xl-9">Account not validated, check email spam to validate account
    </div>
    <div className="col col-6 col-md-5 col-lg-4 col-xl-3">
    <button className="btn btn-danger float-right">Resend email</button>
  </div>
</div>
*/
  return (
    <div>
      <h2>Welcome, <em>{props.userData.first_name}</em></h2>
      {
      !props.userData.validated_email &&
      <div className="alert alert-danger row" role="alert">
        <div className="col col-6 col-md-7 col-lg-8 col-xl-9">
          Account not validated. Check your email spam to validate account.
        </div>
        <div className="col col-6 col-md-5 col-lg-4 col-xl-3">
          <button className="btn btn-danger float-right">Resend email</button>
        </div>
      </div>
      }

      <hr/>

      <UpdateAccountInfo userData={props.userData} setUserData={props.setUserData} views={props.views} setViews={props.setViews}/>

      <hr/>

      <div className="graph">
        <h3>
          Previous Quiz Scores
              </h3>
        <Line data={chartData} options = {options}/>
      </div>


      <button className="btn btn-primary" onClick={onClick}>Log out</button>
    </div>
  );

}

export default UserSummary;
