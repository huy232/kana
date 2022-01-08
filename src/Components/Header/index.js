/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { supabase } from "../../supabaseClient";
function Header() {
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const controlNavbar = () => {
    // if(window.scrollY >)
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(async () => {
    const { data } = await supabase
      .from("animes")
      .select("anime_title")
      .textSearch("anime_title", searchInput);

    setSearchResult(data);

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [searchInput]);

  return (
    <div className={`header ${show && "header-bg"}`}>
      <div className="flex-header">
        <img
          className="logo"
          src="https://uryrsgzighirhzyhxkpz.supabase.in/storage/v1/object/sign/logo-store/003.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvLXN0b3JlLzAwMy5wbmciLCJpYXQiOjE2NDAzNDE3NjQsImV4cCI6MTk1NTcwMTc2NH0.qLsgphOmfdFVinLHMGSdfQ-DXwPeL-_PAkP8i2F7Sz8"
        />
        <nav className="navbar">
          <NavLink exact="true" to="/">
            <i className="fas fa-tv"> Trang chủ</i>
          </NavLink>
          {/* <NavLink className="push-second" to="/login">
            <i className="fas fa-sign-in-alt"> Đăng nhập</i>           
            </NavLink> */}
          <input
            type="text"
            id="header-search"
            placeholder="Search anime"
            value={searchInput}
            onChange={handleChange}
          />
          <ul>
            {searchResult === null
              ? console.log("Not exist")
              : searchResult.map((item, i) => {
                  console.log(item.anime_title);
                })}
            {/* {searchResult.map((item, i) => {
              {
                console.log(item.anime_title);
              }
              <li key={i}>{item.anime_title}</li>;
            })} */}
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default Header;
