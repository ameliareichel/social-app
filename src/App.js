import axios from 'axios';
import { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import AppRoutes from './routes/AppRoutes';

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");

  axios.defaults.headers.post["Content-Type"] = "application/json"


  return (
    <div className="App">
      <Navigation user={user} setUser={setUser} />
      <AppRoutes user={user} setUser={setUser} />
    </div>
  );
}

export default App;