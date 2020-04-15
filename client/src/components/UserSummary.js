import React from 'react'
import { logout } from '../SessionManager.js';
import {Line} from 'react-chartjs-2';

const UserSummary = (props) => {

    if(!props.userData.quizScores) return (<p>Loading...</p>)

    const onClick = () => {
        logout(props.views, props.setViews, props.setUserData);
    }

    let labels = [];
    for(let i = 0; i < props.userData.quizScores.length; i++){
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

          <form id="formUserData">
            <div className="form-group">
              
            </div>
          </form>


            <h2>Welcome, <em>{props.userData.email}</em></h2>
            <p>Your unique user ID is <b>{props.userData.id}</b></p>
            <p>You <b>{(props.userData.admin ? "are" : "are not")}</b> an admin.</p>


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
