/**
 * Hey, if you're reading this code, we're sorry.  It's a mess. Good luck
 * 
 * - Team Double Name, CEN3031 Spring 2020 @ UFL
 * */

/*IMPORTS*/
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js'
import UserSummary from './components/UserSummary.js';
import NavBar from './components/NavBar.js';
import SubmitAccident from './components/SubmitAccident.js';
import Search from './components/search/Search.js';
import ControlPanel from './components/superAdmin/ControlPanel.js';

import Rivalry from './components/rivalry/Rivalry.js';

import QuizTab from './components/quiz/QuizTab.js';
import HomeTab from './components/Home/HomeTab.js';
import QuizManager from './components/superAdmin/QuizManager.js';
import AccountManager from './components/superAdmin/AccountManager.js';
import RivalryManager from './components/superAdmin/RivalryManager.js';

import {loadProfile} from './SessionManager.js';

/*APP - MAIN COMPONENT*/
const App = () => {

  /*Hooks*/
  let [loaded, setLoaded] = useState(false); //Has the client requested profile data?

  let [userData, setUserData] = useState({
    id: null,
    admin: null,
    email: null,
    quizScores: null
  });

  let [views, setViews] = useState({
    userProfile: false,
    signup: false,
    login: false,
    submitAccident: false,
    citySearch: false,
    quiz: false,
    home: true,
    rivalry: false,
    superAdmin: false,
    manageRivalries: false,
    manageQuizzes: false,
    manageUsers: false
  });

  /*FUNCTIONS*/

  if (!loaded){
    loadProfile(views, setViews, userData, setUserData, false);
    setLoaded(true);
    return(<p>Loading...</p>);
  }

  if(userData.quizScores === null) {
    return (<p>Loading...</p>)
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
          <h1>Safe Driving Challenge</h1>
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
            <QuizTab userData={userData} setUserData={setUserData} setViews={setViews} views={views}/>
          </CSSTransition>

          <CSSTransition in={views.home} timeout={0} classNames="fade" unmountOnExit>
            <HomeTab userData={userData} setUserData={setUserData} setViews={setViews} views={views} />
          </CSSTransition>

          <CSSTransition in={views.submitAccident} timeout={0} classNames="fade" unmountOnExit>
            <SubmitAccident />
          </CSSTransition>

          <CSSTransition in={views.citySearch} timeout={0} classNames="fade" unmountOnExit>
            <Search />
          </CSSTransition>

          <CSSTransition in={views.rivalry} timeout={0} classNames="fade" unmountOnExit>
            <Rivalry />
          </CSSTransition>

          <CSSTransition in={views.superAdmin} timeout={0} classNames="fade" unmountOnExit>
            <ControlPanel userData={userData} setUserData={setUserData} setViews={setViews} views={views} />
          </CSSTransition>

          <CSSTransition in={views.manageQuizzes} timeout={0} classNames="fade" unmountOnExit>
            <QuizManager />
          </CSSTransition>

          <CSSTransition in={views.manageUsers} timeout={0} classNames="fade" unmountOnExit>
            <AccountManager/>
          </CSSTransition>

          <CSSTransition in={views.manageRivalries} timeout={0} classNames="fade" unmountOnExit>
            <RivalryManager/>
          </CSSTransition>
          

        </div>
        <div className="col col-12 col-sm-1 col-md-2 col-xl-3"></div>
      </div>
    </div>
  );

}

export default App;
