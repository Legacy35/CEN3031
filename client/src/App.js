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

import Compare from './components/compare/Compare.js';

import QuizTab from './components/quiz/QuizTab.js';
import GraphTab from './components/compare/GraphTab.js';
import QuizManager from './components/QuizManager.js';

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
    compare: false,
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
          <h1>Insurance Driver App</h1>
          <hr style={{ borderTop: '1px solid #8c8b8b' }}></hr>
          <QuizManager/>
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
            <GraphTab userData={userData} setUserData={setUserData} setViews={setViews} views={views} />
          </CSSTransition>

          <CSSTransition in={views.submitAccident} timeout={0} classNames="fade" unmountOnExit>
            <SubmitAccident />
          </CSSTransition>

          <CSSTransition in={views.citySearch} timeout={0} classNames="fade" unmountOnExit>
            <Search />
          </CSSTransition>

          <CSSTransition in={views.compare} timeout={0} classNames="fade" unmountOnExit>
            <Compare />
          </CSSTransition>

          <CSSTransition in={views.superAdmin} timeout={0} classNames="fade" unmountOnExit>
            <ControlPanel userData={userData} setUserData={setUserData} setViews={setViews} views={views} />
          </CSSTransition>

        </div>
        <div className="col col-12 col-sm-1 col-md-2 col-xl-3"></div>
      </div>
    </div>
  );

}

export default App;
