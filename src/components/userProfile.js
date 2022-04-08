import UserNavBar from "./userHeader";
import "../styles/userProfile.css";
import { useEffect, useState } from "react";
import { serverBaseUrl } from "../environment/environment";
import axios from 'axios';

const UserProfile = () =>{

    const [fname, setFname] = useState("F");
    const [lname, setLname] = useState("L");
    const [email, setUserEmail] = useState("");
    const [rewards, setRewards] = useState(0);
    
    useEffect(()=>{
        const url =serverBaseUrl+"/user";
        const token = localStorage.getItem('token');
    
        axios.get(url, {headers: {"Authorization" : `Bearer ${token}`}})
        .then((response)=>{
            setFname(response.data.first_name);
            setLname(response.data.last_name);
            setUserEmail(response.data.email);
            setRewards(response.data.mileage_points);
        })
        .catch((error)=>{
            console.log(error.response.data.message)
        });
    },[])

    return (
        <div>
           <UserNavBar/>
         <div className="userProf-container">
            <div className="userProf-header">
                <span>Account</span>
            </div>
            <div className="userProf-details">
                <div className="circle">
                    {fname[0].toUpperCase()}{lname[0].toUpperCase()}
                </div>
                <div className="user-elements">       
                    <label className="labels" for="lname">Name:</label>
                    <span className="userName">{fname} {lname}</span>
                </div>

                <div className="user-elements">       
                    <label className="labels" for="email">Email:</label>
                    <span>{email}</span>
                </div>

                <div className="user-elements">       
                    <label className="labels" for="email">Rewards:</label>
                    <span>$ {rewards}</span>
                </div>

                <div className="user-elements">       
                    <label className="labels" for="email">Pending Rewards:</label>
                    <span>$ 0</span>
                </div>

            </div>
         </div>
    </div>);
}

export default UserProfile;


