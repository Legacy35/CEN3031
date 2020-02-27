/*IMPORTS*/
import React, {useState, ReactDOM} from 'react';
import {CSSTransition } from 'react-transition-group';

import axios from 'axios';

import Cookies from 'universal-cookie';

import Login from './components/Login';
import SignUp from './components/SignUp'
import UserSummary from './components/UserSummary';
import NavBar from './components/NavBar';
import LoginLogout from './components/LoginLogout';

import './css/style.css';
import './css/bootstrap.min.css';



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
 
      <h1>Insurance Driver App Thing™</h1>
      <NavBar views={views} setViews={setViews} />

      <LoginLogout views={views} setViews={setViews} token={token} setToken={setToken} setUserData={setUserData}/>

      <div className="row">
        <div className="col col-1 col-xs-1 col-md-4"></div>
        <div className="col col-10 col-xs-10 col-md-4">
          <CSSTransition in={views.signup} timeout={0} classNames="fade" unmountOnExit>
            <SignUp userData={userData} setUserData={setUserData} setViews={setViews} views={views} setToken={setToken}/>
          </CSSTransition>

          <CSSTransition in={views.userProfile} timeout={0} classNames="fade" unmountOnExit >
            <UserSummary userData={userData} setUserData={setUserData} views={views} setViews={setViews} />
          </CSSTransition>

          <CSSTransition in={views.login} timeout={0} classNames="fade" unmountOnExit>
            <Login userData={userData} setUserData={setUserData} setViews={setViews} views={views} setToken={setToken}/>
          </CSSTransition>
          
        </div>
        <div className="col col-1 col-xs-1 col-md-4"></div>
      </div>

    </div>
  );

}

export default App;
