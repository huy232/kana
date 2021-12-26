import Header from '../Header/index'
import Home from '../Home/index'
import AnimeList from '../AnimeList/index'

import {
    Routes,
    Route,
  } from "react-router-dom";

  function MainApp() {
    return (     
        <div id = "main">
            <Header/>
            <div className = "content">
            <Routes>
              <Route path="/" element = {<Home/>}/>
              <Route path="/anime-list" element={<AnimeList/>}/>
            </Routes>
            </div>
        </div>
        
    );
  }
  
  export default MainApp;