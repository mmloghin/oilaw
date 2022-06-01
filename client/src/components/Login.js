import React, { useState } from "react";
import Axios from "axios";

function Login() {

    const [usernameReg, setUsernameReg] = useState ("")
    const [passwordReg, setPasswordReg] = useState ("")

    const register = () => {
        Axios.post("http://localhost:5000/api/register",{username: usernameReg, password: passwordReg}).then ((response) => {
            console.log(response);
        });
    };

    return (
        <div classname ="signUp">
            <div classname= "registration">
                <h1>Registration</h1>
                <label>Username</label>
                <input type="text" onChange ={(e) => {setUsernameReg(e.target.value)}}/>
                <label>Password</label>
                <input type="text" onChange ={(e) => {setPasswordReg(e.target.value)}}/>
                <button onClick={register}> Register </button>
            </div>
            <div classname ="login">
                <h1>Log In</h1>
                <input type= "text" placeholder="Username"/>
                <input type= "password" placeholder="Password"/>
                <button>Log In </button>
            </div>
        </div>
    );
}

export default Login;