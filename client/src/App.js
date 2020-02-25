import React, {useState} from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp'
import UserSummary from './components/UserSummary';
import Cookies from 'universal-cookie';
import axios from 'axios';

import './css/style.css';
import './css/bootstrap.min.css';

const App = () => {

  let [userInfo, setUserInfo] = useState({
    id: undefined,  
    admin: undefined,
    email: undefined
  });

  const displayUserInfo = () => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    axios.get('/apis/authenticate/whois.php?token=' + token).then(
        (res) => {
          if(res.data && !res.data.err){
            setUserInfo({
              id: res.data.id,  
              admin: res.data.admin,
              email: res.data.email
            });
            console.log(userInfo);
          }
        }
    ).catch(
        (err) => {

        }
    );
}

  return (
    <div>
      <h1>Insurance Driver App Thing™</h1>
      <SignUp displayUserInfo={displayUserInfo}/>
      <Login displayUserInfo={displayUserInfo}/>
      <UserSummary userInfo={userInfo}/>
    </div>
  );
}

export default App;
