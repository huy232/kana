/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react"
import './header.css'
import { NavLink } from 'react-router-dom'
function Header(){
    return (
    <div className = "header">
        <div className = "flex-header">
        <img className = "logo" src = "https://uryrsgzighirhzyhxkpz.supabase.in/storage/v1/object/sign/logo-store/003.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvLXN0b3JlLzAwMy5wbmciLCJpYXQiOjE2NDAzNDE3NjQsImV4cCI6MTk1NTcwMTc2NH0.qLsgphOmfdFVinLHMGSdfQ-DXwPeL-_PAkP8i2F7Sz8"/>
        <nav className = "navbar">

            <NavLink exact="true" to="/">
            <i className="fas fa-tv"> Trang chủ</i>
            </NavLink>
            <NavLink className="push-second" to="/login">
            <i className="fas fa-sign-in-alt"> Đăng nhập</i>           
            </NavLink>
        </nav>
        </div>
    </div>
    )

}
export default Header