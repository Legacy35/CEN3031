import React , {useState} from 'react';
import Cookies from 'universal-cookie';

import {isLoggedIn, loadProfile} from '../SessionManager';

const cookies = new Cookies();

const NavBar = (props) => {

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  }

  /*View methods*/
  const hideAll = () => {
    let keys = Object.keys(props.views);
    let views = {...props.views};
    for(let i = 0; i < keys.length; i++){
      views[keys[i]] = false;
    }
    return views;
  }

  const signup = () => {
    props.setViews({...hideAll(), signup: true});
  }

  const signin = () => {
    props.setViews({...hideAll(), login: true});
  }

  const userSummary = () => {
    loadProfile(props.views, props.setViews, props.userData, props.setUserData);
  }

  const quizzes = () => {
    props.setViews({...hideAll(), quiz: true});
  }

  const home = () => {
    props.setViews({...hideAll(), home: true});
  }

  const submitAccident = () => {
    props.setViews({...hideAll(), submitAccident: true});
  }

  const citySearch = () => {
    props.setViews({...hideAll(), citySearch: true});
  }

  const compare = () => {
    props.setViews({...hideAll(), compare: true});
  }
  

  const selectedStyle={
    color: "red",
    backgroundColor: "black"
  };

  const wrapperClass = expanded ? "navbar wrapper expanded nomargin nopadding" : "navbar wrapper not-expanded nomargin nopadding";

  return (
    <div id="navbar" className="outline">
      <ul className="navbar">

        <button type="button" className="navbar hamburger" onClick={toggleExpand}>
          <i className="fas fa-bars"></i>
        </button>

        <div className={wrapperClass}>
          <button type="button" className="navbar" style={props.views.home ? selectedStyle : {}} onClick={home}>Home</button>
          {!isLoggedIn() && <button type="button" className="navbar" style={props.views.signup ? selectedStyle : {}} onClick={signup}>Sign up</button>}
          {!isLoggedIn() && <button type="button" className="navbar" style={props.views.login ? selectedStyle : {}} onClick={signin}>Sign in</button>}
          {isLoggedIn() && <button type="button" className="navbar" style={props.views.userProfile ? selectedStyle : {}} onClick={userSummary}>User Profile</button>}
          {props.userData.admin == true && <button type="button" className="navbar" style={props.views.submitAccident ? selectedStyle : {}} onClick={submitAccident}>Submit Accident Report</button>}
          <button type="button" className="navbar" style={props.views.citySearch ? selectedStyle : {}} onClick={citySearch}>City Search</button>
          {isLoggedIn() && <button type="button" className="navbar" style={props.views.quiz ? selectedStyle : {}} onClick={quizzes}>Quizzes</button>}
          <button type="button" className="navbar" style={props.views.compare ? selectedStyle : {}} onClick={compare}>Compare</button>
          <button id="profileIcon" type="button" className="navbar float-right" onClick={cookies.get('token') ? userSummary : signin} style={{ paddingRight: '10px' }}>
            <i className={(isLoggedIn() ? "fas" : "far") + " fa-user"}></i>
          </button>

        </div>

      </ul>
    </div>
  );



}

export default NavBar;