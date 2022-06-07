import React, { useState } from "react";
import Axios from "axios";
import "./Login.css";

function Login() {

    const [usernameReg, setUsernameReg] = useState ("");
    const [passwordReg, setPasswordReg] = useState ("");

    const [username, setUsername] = useState ("");
    const [password, setPassword] = useState ("");

    const [loginStatus, setLoginStatus] = useState (false);

    
    const register = () => {
        Axios.post("http://localhost:5000/api/register",{username: usernameReg, password: passwordReg}).then ((response) => {
        setUsernameReg("");
        setPasswordReg("");
        });
    };

    const login = () => {
        Axios.post("http://localhost:5000/api/login",{username: username, password: password}).then ((response) => {
            
        if (!response.data.auth) {
            setLoginStatus(false);
        } else {
            console.log(response.data);
            setLoginStatus(true);
        }

        });
    };

    const logout = () => {
        setLoginStatus(false);
    };


    return (
        <div className ="signUp">
            <div className= "registration">
                <h1>Registration</h1>
                <label>Username</label>
                <input type="text" onChange ={(e) => {setUsernameReg(e.target.value)}}/>
                <label>Password</label>
                <input type="text" onChange ={(e) => {setPasswordReg(e.target.value)}}/>
                <button onClick={register}> Register </button>
            </div>


            <div className ="login">
            {!loginStatus && (
                <>
                <h1>Log In</h1>
                <input type= "text" placeholder="Username" onChange ={(e) => {setUsername(e.target.value)}}/>
                <input type= "password" placeholder="Password" onChange ={(e) => {setPassword(e.target.value)}}/>
                <button onClick={login}> Login </button>
                </>
                )}
            </div>
        <div className= "signedIn">
            {loginStatus && <h1>You are logged in!</h1>}
            {loginStatus && <button onClick={logout}>Log out</button>}
        </div>
        </div>
    );
}

export default Login;