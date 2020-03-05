/*IMPORTS*/
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import axios from 'axios';

import Cookies from 'universal-cookie';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp'
import UserSummary from './components/UserSummary';
import NavBar from './components/NavBar';
import SubmitAccident from './components/SubmitAccident';

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
    login: false,
    submitAccident: false
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

  if (!userData.id) loadProfileData();

  return (
    <div>
      <div className="row nopadding nomargin">
        <div className="col col-12 nopadding">
          <NavBar views={views} setViews={setViews} token={token} setToken={setToken} userData={userData} setUserData={setUserData} />
        </div>
      </div>
      <div className="row nopadding nomargin">
        <div className="col col-3"></div>
        <div className="col col-6">
          <h1>Insurance Driver App Thing™</h1>
          <hr style={{ borderTop: '1px solid #8c8b8b' }}></hr>
          <CSSTransition in={views.signup} timeout={0} classNames="fade" unmountOnExit>
            <SignUp userData={userData} setUserData={setUserData} setViews={setViews} views={views} setToken={setToken} />
          </CSSTransition>

          <CSSTransition in={views.userProfile} timeout={0} classNames="fade" unmountOnExit >
            <UserSummary userData={userData} setUserData={setUserData} views={views} setViews={setViews} />
          </CSSTransition>

          <CSSTransition in={views.login} timeout={0} classNames="fade" unmountOnExit>
            <SignIn userData={userData} setUserData={setUserData} setViews={setViews} views={views} setToken={setToken} />
          </CSSTransition>

          <CSSTransition in={views.submitAccident} timeout={0} classNames="fade" unmountOnExit>
            <SubmitAccident />
          </CSSTransition>

        </div>
        <div className="col col-3"></div>
      </div>
    </div>
  );

}

export default App;
