import { useState } from "react";
import { Link , useNavigate} from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const[email, setEmail] = useState("");
    const[password, setPassword]=useState("");

    const onLogin = (e) => {
        e.preventDefault();
        console.log(email, password);
        navigate("/searchFlights");
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
                        <input onClick={(e)=>onLogin(e)} id="form-btn" type="submit" value="Login"></input>
                    </div>

                    <div className="loginInfo">
                        <span>Don't have an account? <Link to="/signUp"><span>Sign Up</span></Link></span>
                    </div>
                </div>
            </form>
        </div>
    );   
}

export default Login;