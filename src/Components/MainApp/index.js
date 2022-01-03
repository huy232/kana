import Header from '../Header/index'
import Home from '../Home/index'
import AnimeList from '../AnimeList/index'
import AnimeWatch from '../AnimeWatch/index'
import AnimeDetail from '../AnimeDetail/index'

import {
    Routes,
    Route,
  } from "react-router-dom";

  function MainApp() {
    return (     
        <div id = "main">
            <Header/>
            <div className="spacer">
            &nbsp;
            </div>
            <div className = "content">
            <AnimeWatch/>
            <Routes>
              <Route path="/" element = {<Home/>}/>
              <Route path="/anime-list" element={<AnimeList/>}/>
              <Route path="/anime/detail/:id" element={<AnimeDetail/>}/>
            </Routes>

            </div>
        </div>
        
    );
  }
  
  export default MainApp;