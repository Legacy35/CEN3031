/*IMPORTS*/
import React, {useState, ReactDOM} from 'react';
import {CSSTransition } from 'react-transition-group';

import axios from 'axios';

import Cookies from 'universal-cookie';

import Login from './components/SignIn';
import SignUp from './components/SignUp'
import UserSummary from './components/UserSummary';
import NavBar from './components/NavBar';

import './css/navbar.css';

/*CONSTANTS*/
const cookies = new Cookies();

/*APP - MAIN COMPONENT*/
const App = () => {

  /*Hooks*/
  let [userData, setUserData] = useState({
    id: undefined,
    admin: undefined,
    email: undefined
  });

  let [views, setViews] = useState({
    userProfile: false,
    signup: true,
    login: false
  });

  let [token, setToken] = useState(cookies.get('token'));

  /*FUNCTIONS*/
  let loadProfileData = async () => {
    if (token) {
    
      axios.get('/apis/authenticate/whois.php?token=' + token).then(
        (res) => {
          if (res.data.id) {
            setUserData(res.data);
          }
        }
      ).catch(
        (err) => {
          console.log(err);
        }
      );
    }
  }

  if(!userData.id) loadProfileData();

  return (
    <div>
      <div className="row nopadding nomargin">
          <div className="col col-12 nopadding">
            <NavBar views={views} setViews={setViews} token={token} setToken={setToken} userData={userData} setUserData={setUserData}/>
          </div>
      </div>
      <div className="row nopadding nomargin">
        <div className="col col-4"></div>
        <div className="col col-4">
        <h1>Insurance Driver App Thing™</h1>
          <CSSTransition in={views.signup} timeout={0} classNames="fade" unmountOnExit>
            <SignUp userData={userData} setUserData={setUserData} setViews={setViews} views={views} setToken={setToken} />
          </CSSTransition>

          <CSSTransition in={views.userProfile} timeout={0} classNames="fade" unmountOnExit >
            <UserSummary userData={userData} setUserData={setUserData} views={views} setViews={setViews} />
          </CSSTransition>

          <CSSTransition in={views.login} timeout={0} classNames="fade" unmountOnExit>
            <Login userData={userData} setUserData={setUserData} setViews={setViews} views={views} setToken={setToken} />
          </CSSTransition>
        </div>
        <div className="col col-4"></div>
      </div>
    </div>
  );

}

export default App;
