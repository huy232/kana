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
              <Route exact path="/" element = {<Home/>}/>
              <Route path="/anime-list" element={<AnimeList/>}/>
              <Route path="/anime/detail/:id" element={<AnimeDetail/>}/>
              <Route path="/watch/:id/:episode" element={<AnimeWatch/>}/>
            </Routes>

            </div>
        </div>
        
    );
  }
  
  export default MainApp;