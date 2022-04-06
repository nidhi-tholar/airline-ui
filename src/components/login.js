import { useState } from "react";
import { Link , useNavigate} from 'react-router-dom';
import { serverBaseUrl } from "../environment/environment";
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();

    const[email, setEmail] = useState("");
    const[password, setPassword]=useState("");
    const[errorMessage, setErrorMessage]=useState("");

    const onLogin = (e) => {
        e.preventDefault();

        const url = serverBaseUrl+"/user";
        axios.post(url, {email:email,password:password})
            .then( async(response) => {
                let token = response.headers['authorization'].split(" ")[1];
                localStorage.setItem('token', token);

                const userLoginData = await response.data;
                if(userLoginData.user.user_type==="admin"){
                    navigate("/adminFlightStatus");
                }
                if(userLoginData.user.user_type==="customer"){
                    navigate("/searchFlights");
                }
            })
            .catch((error => {
                setErrorMessage(error.response.data.message);
            } ));
    }

    return(
        <div>
            <form className="form">
                <div>
                    <header>Login</header>

                    <div className="form-elements">
                        <label for="username">Email</label> &nbsp;
                        <input onChange = {(e)=>setEmail(e.target.value)}  value={email} type="email" name="email"></input>
                    </div>

                    <div className="form-elements">
                        <label for="password">Password</label> &nbsp;
                        <input onChange = {(e)=>setPassword(e.target.value)} value={password} type="password" name="password"></input>
                    </div>

                    <div className="form-elements" >
                        <div style={{color:"red"}}>{errorMessage}</div>
                        <input onClick={(e)=>onLogin(e)} id="form-btn" type="submit" value="Login"></input>
                    </div>

                    <div className="loginInfo">
                        <span>Don't have an account? <Link to="/signUp"><span style={{color:"black", textDecoration:"none"}}>Sign Up</span></Link></span>
                    </div>
                </div>
            </form>
        </div>
    );   
}

export default Login;