/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react"
import './login.css'
function LogIn({ Input, error }){

    const [detail, setDetail] = useState({username: "", password: ""})

    const submitHandler = e => {
        e.preventDefault()

        Input(detail)
    }

    return (
        <div className = "login-background fullscreen-login">
            <div className = "login-section">
                {/* ERROR! */}
            <form onSubmit={submitHandler}>
                <label htmlFor="username">
                    <b>Tài khoản đăng nhập</b>
                </label>
                <input type="text" placeholder="Xin hãy nhập tài khoản đăng nhập" name = "username" required onChange = { e => setDetail({...detail, username: e.target.value})} value = {detail.username}/>
                <label htmlFor="password">
                    <b>Mật khẩu</b>
                </label>
                <input type="password" placeholder="Xin hãy nhập mật khẩu" name = "password" required onChange = { e => setDetail({...detail, password: e.target.value})} value = {detail.password}/>

                <button type="submit">Đăng nhập</button>
                <label>
                {/* <input type="checkbox" checked="checked" name="remember"/> Ghi nhớ */}
                </label>
            </form>
            </div>
        </div>
    )

}
export default LogIn