import Header from "../Header/index";
import Home from "../Home/index";
import AnimeWatch from "../AnimeWatch/index";
import AnimeDetail from "../AnimeDetail/index";
import Search from "../Search/index";

import { Routes, Route } from "react-router-dom";

function MainApp() {
  return (
    <div id="main">
      {window.location.pathname === "/watch/:id/:episode" ? null : <Header />}

      <div className="spacer">&nbsp;</div>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/anime/detail/:id" element={<AnimeDetail />} />
          <Route path="/watch/:id/:episode" element={<AnimeWatch />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainApp;
