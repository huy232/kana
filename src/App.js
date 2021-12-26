/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import './App.css';
import "swiper/css/bundle";
import MainApp from './Components/MainApp/index'
import LogIn from './Components/LogIn/index'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {useState, useEffect} from "react"

function App() {

  const [user, setUser] = useState({username: "", password: ""})
  const [error, setError] = useState("")

  const Input = details => { console.log (details) }
  const Logout = () => {console.log('Log out')}

  return (     
    <Router>
      <div id = "main">
          <div className = "content">
          <Routes>
            <Route path="*" element = {<MainApp/>}/>
            {(user.username != "") ? (
              <div>
                <h2>Welcome back</h2>
              </div>
            ):
            <Route path="/login" element={<LogIn Input = {Input} error = {error}/>}/>
          }
          </Routes>
          </div>
      </div>
      
    </Router>
  );
}

export default App;
