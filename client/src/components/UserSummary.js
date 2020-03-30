import React from 'react'
import { logout } from '../SessionManager.js';
import QuizChart from './quiz/QuizChart.js';

const UserSummary = (props) => {

    const onClick = () => {
        logout(props.views, props.setViews, props.setUserData);
    }

    let i = 1;

    return (
        <div>
            <h2>Welcome, <em>{props.userData.email}</em></h2>
            <p>Your unique user ID is <b>{props.userData.id}</b></p>
            <p>You <b>{(props.userData.admin ? "are" : "are not")}</b> an admin.</p>
            <p>Account quiz history:</p>
            {
                props.userData.quizScores ?

                props.userData.quizScores.map((element) => ( <div>

                <p>Quiz {i++}: {element}%</p>

                </div> ))
                
                :
                
                <p></p>
            }

            <QuizChart />
            <button className="btn btn-primary" onClick={onClick}>Log out</button>
        </div>
    );

}

export default UserSummary;