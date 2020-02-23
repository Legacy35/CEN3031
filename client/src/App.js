import React, {useState} from 'react';
import './App.css';
import Login from './components/Login';

const App = () => {

  let [token, setToken] = useState(undefined);

  return (
    <div>
      <Login toke={token} setToken = {setToken}/>
    </div>
  );
}

export default App;
