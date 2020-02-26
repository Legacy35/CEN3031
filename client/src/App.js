import React, {useState} from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp'
import UserSummary from './components/UserSummary';
import NavBar from './components/NavBar';

import {CSSTransition } from 'react-transition-group';

import './css/style.css';
import './css/bootstrap.min.css';

const App = () => {

  let [userInfo, setUserInfo] = useState({
    id: undefined,  
    admin: undefined,
    email: undefined
  });

  let [views, setViews] = useState({
    userInfo: false,
    signup: false,
    signin: false
  });

  return (
    <div>
      <h1>Insurance Driver App Thing™</h1>

      <NavBar views={views} setViews={setViews}/>

        {views.signup && <SignUp userInfo={userInfo} setUserInfo={setUserInfo} setViews={setViews} views={views}/>}


      <div className="row">
          
      </div>
      <div className="row">
        <Login userInfo={userInfo} setUserInfo={setUserInfo} setViews={setViews} views={views}/> 
      </div>
      <CSSTransition in={views.userInfo} timeout={1000} classNames="zoom-in" unmountOnExit>
        <UserSummary userInfo={userInfo}/>
      </CSSTransition>
    </div>
  );

}

export default App;
