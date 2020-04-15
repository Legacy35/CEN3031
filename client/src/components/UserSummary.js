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
    let admin_string = "";
    let dash_string = "You do not currently have a dashcam installed in your vehicle";
    
    if(props.userData.super_admin == 1){
      admin_string = "You are logged in with an admin account";
    }
    else if (props.userData.admin == 1){
      admin_string = "You are logged in with an insurance company account";;
    }
    if(props.userData.dashcam == 1){
      dash_string = "You have a dashcam installed in your vehicle";
    }
    return (
      <div>
        <h2>Welcome, <em>{props.userData.first_name}</em></h2>
        {
          !props.userData.validated_email &&
          <div className="alert alert-danger row" role="alert">
            <div className="col col-6 col-md-7 col-lg-8 col-xl-9">
              Account not validated, check email spam to validate account
            </div>
            <div className="col col-6 col-md-5 col-lg-4 col-xl-3">
              <button className="btn btn-danger float-right">Resend email</button>
            </div>
          </div>
        }
            {(!props.userData.super_admin && !props.userData.admin) && (<p>Address: <b>{props.userData.address}</b></p>)}
            {(!props.userData.super_admin && !props.userData.admin) && (<p>Phone Number: <b>{props.userData.phone_number}</b></p>)}
            {(!props.userData.super_admin && !props.userData.admin) && (<p>Insurance Company: <b>{props.userData.insurance_company}</b></p>)}
            <p><b>{dash_string}</b></p>
            <p><b>{admin_string}</b></p>


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
