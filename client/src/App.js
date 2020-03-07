/*IMPORTS*/
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import axios from 'axios';

import Cookies from 'universal-cookie';

import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js'
import UserSummary from './components/UserSummary.js';
import NavBar from './components/NavBar.js';
import SubmitAccident from './components/SubmitAccident.js';
import QuizTab from './components/QuizTab.js';
import GraphTab from './components/GraphTab.js';

import {isLoggedIn, loadProfile, login} from './SessionManager.js';


/*CONSTANTS*/
const cookies = new Cookies();

/*APP - MAIN COMPONENT*/
const App = () => {

  /*Hooks*/
  let [loaded, setLoaded] = useState(false);

  let [userData, setUserData] = useState({
    id: undefined,
    admin: undefined,
    email: undefined
  });

  let [views, setViews] = useState({
    userProfile: false,
    signup: true,
    login: false,
    submitAccident: false,
    quiz: false,
    graph: false,
  });

  /*FUNCTIONS*/


  if (!loaded){
    if(isLoggedIn()){
      loadProfile(setUserData, views, setViews);
    } else {

    }
    setLoaded(true);
    return(<p>Loading...</p>);
  }

  return (
    <div style={{marginBottom: '15px'}}>
      <div className="row nopadding nomargin">
        <div className="col col-12 nopadding">
          <NavBar views={views} setViews={setViews} userData={userData} setUserData={setUserData} />
        </div>
      </div>
      <div className="row nopadding nomargin">
        <div className="col col-12 col-sm-1 col-md-2 col-xl-3"></div>
        <div className="col col-12 col-sm-10 col-md-8 col-xl-6">
          <h1>Insurance Driver App</h1>
          <hr style={{ borderTop: '1px solid #8c8b8b' }}></hr>
          <CSSTransition in={views.signup} timeout={0} classNames="fade" unmountOnExit>
            <SignUp userData={userData} setUserData={setUserData} setViews={setViews} views={views} />
          </CSSTransition>

          <CSSTransition in={views.userProfile} timeout={0} classNames="fade" unmountOnExit >
            <UserSummary userData={userData} setUserData={setUserData} views={views} setViews={setViews}/>
          </CSSTransition>

          <CSSTransition in={views.login} timeout={0} classNames="fade" unmountOnExit>
            <SignIn userData={userData} setUserData={setUserData} setViews={setViews} views={views} />
          </CSSTransition>

          <CSSTransition in={views.quiz} timeout={0} classNames="fade" unmountOnExit>
            <QuizTab userData={userData} setUserData={setUserData} setViews={setViews} views={views} />
          </CSSTransition>

          <CSSTransition in={views.graph} timeout={0} classNames="fade" unmountOnExit>
            <GraphTab userData={userData} setUserData={setUserData} setViews={setViews} views={views} />
          </CSSTransition>

          <CSSTransition in={views.submitAccident} timeout={0} classNames="fade" unmountOnExit>
            <SubmitAccident />
          </CSSTransition>

        </div>
        <div className="col col-12 col-sm-1 col-md-2 col-xl-3"></div>
      </div>
    </div>
  );

}

export default App;
