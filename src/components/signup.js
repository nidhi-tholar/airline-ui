import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();

    const[email, setEmail] = useState("");
    const[password, setPassword]=useState("");

    const onSignUp = (e) => {
        e.preventDefault();
        console.log(email, password);
        navigate("/");
    }

    return(
        <div>
            <form className="form">
                <div>
                    <header>Sign Up</header>

                    <div className="form-elements">
                        <label for="username">Email</label> &nbsp;
                        <input onChange = {(e)=>setEmail(e.target.value)}  value={email} type="email" name="email"></input>
                    </div>

                    <div className="form-elements">
                        <label for="password">Password</label> &nbsp;
                        <input onChange = {(e)=>setPassword(e.target.value)} value={password} type="password" name="password"></input>
                    </div>

                    <div className="form-elements" >
                        <input onClick={(e)=>onSignUp(e)} id="form-btn" type="submit" value="Sign Up"></input>
                    </div>

                    <div className="loginInfo">
                        <span>Have an account? <Link to="/"><span>Login</span></Link></span>
                    </div>
                </div>
            </form>
        </div>
    );   
}

export default SignUp;