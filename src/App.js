/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import "./App.css";
import "swiper/css/bundle";
import MainApp from "./Components/MainApp/index";
import LogIn from "./Components/LogIn/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div id="main">
        <div className="content">
          <Routes>
            <Route path="*" element={<MainApp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
