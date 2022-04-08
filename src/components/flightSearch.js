import UserNavBar from "./userHeader";
import '../styles/flightSearch.css';
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { serverBaseUrl } from "../environment/environment";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/fontawesome-free-solid';

import { timeConversion, calculateDuration } from "../util";


const FlightSearch = () =>{

    const [flights, setFlights] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const searchFlights = (e, departureAirport, arrivalAirport, departureDate) => {
        e.preventDefault();
        setShowResult(true);

        const url =serverBaseUrl+"/flight";
        const token = localStorage.getItem('token');

        axios.get(url,
                    {params: {depart_date:departureDate.toLocaleDateString('en-CA'), 
                              airport1:departureAirport, 
                              airport2:arrivalAirport}
                    },
                    {headers: {"Authorization" : `Bearer ${token}`}}
                 )
            .then((response)=>{
                setFlights(response.data);
            }).catch((error)=>{
                console.log(error.response.data.message)
            })
    }

   return (
       <div>
           <UserNavBar/>
           <div className="Container">
                <FlightSeacrhInput searchFlights={searchFlights}/>
                <div>{ showResult ? (flights.length>0? <div>{flights.length > 0 && <div>{flights.map((flight) => {return <Flight flight={flight} key={flight.id}/>})}</div>}</div>:<div>{flights.length == 0 && <NoFlights/>}</div>) : null }</div>
           </div>
       </div>
   );
}

const NoFlights = () => {
    return (<div style={{fontSize:"20px", textAlign:"center", color:"red", margin:"100px"}}>
        Oops! No Flights for the selected date.
        </div>);
}

const Flight = (props) => {
    
    return (
        <div className="flightContainer">

            <div className="row">
                <div className="col-md-1">
                    <FontAwesomeIcon className="plane-icon-holder" icon={faPlane} size="xl" transform={{ rotate: -25 }} />
                </div>

                <div className="col-md-9 flightInfo">
                    <div className="row">

                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <div >{timeConversion(props.flight.departure_time)}</div>
                                </div>
                                <div className="col-md-6">
                                    <div >{timeConversion(props.flight.arrival_time)}</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div>{calculateDuration(props.flight.departure_date, props.flight.departure_time, props.flight.arrival_date, props.flight.arrival_time)}</div>
                        </div>

                        <div className="col-md-3">
                            <div>$ {props.flight.price}</div>
                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <div style={{fontSize:"22px"}}>{props.flight.departure_airport.code}</div>
                                </div>
                                <div className="col-md-6">
                                    <div >{props.flight.arrival_airport.code}</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                        </div>

                        <div className="col-md-3">
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <Link to="/booking" state={{ flight: props.flight }}>
                        <button className="select-flight-btn">Select Flight</button>
                    </Link>
                </div>
            
            </div>  
        </div>
    )
}

const FlightSeacrhInput = (props) => {

    const [airports, setAirports] = useState([]);
    const [departureAirport, setDepartureAirport] = useState("");
    const [arrivalAirport, setarrivalAirport] = useState("");
    const [departureDate, setDepartureDate] = useState(new Date());

    useEffect(()=>{
        const url =serverBaseUrl+"/airport";
        const token = localStorage.getItem('token');
    
        axios.get(url, {headers: {"Authorization" : `Bearer ${token}`}})
        .then((response)=>{
            setAirports(response.data);
        })
        .catch((error)=>{
            console.log(error.response.data.message)
        });
    },[])

    return (
        <div className="searchForm">
        <form>
            <div className="row">
                <div className="col-md-3">
                    <span className="flight-form-label">From</span>
                </div>

                <div className="col-md-3">
                    <span className="flight-form-label">To</span>
                </div>

                <div className="col-md-3">
                    <span className="flight-form-label">Date</span>
                </div>

                <div className="col-md-3">
                </div>
            </div>

            <div className="row">
                <div className="col-md-3">         
                    <select className="form-fields" value={departureAirport} onChange={(e)=>{setDepartureAirport(e.target.value)}} id="departureAirport" name="departureAirport">
                        <option value="" disabled selected hidden>Origin City</option>
                        {airports.map( (airport) => { return <option value={airport.id}>{airport.city}</option>})}
                    </select>
                </div>

                <div className="col-md-3">         
                    <select className="form-fields" value={arrivalAirport} onChange={(e)=>{setarrivalAirport(e.target.value)}} id="arrivalAirport" name="arrivalAirport">
                        <option value="" disabled selected hidden>Destination City</option>
                        {airports.filter(airport => airport.id !== departureAirport).map( (airport) => { return <option value={airport.id}>{airport.city}</option>})}
                    </select>
                </div>

                <div className="col-md-3">         
                    <DatePicker className="form-fields" value={departureDate} selected={departureDate} onChange={(date) => setDepartureDate(date)} />
                </div>

                <div className="col-md-3">         
                    <input onClick={(e) => props.searchFlights(e, departureAirport, arrivalAirport, departureDate)} class="btn-search" type="submit" value="Search Flights"></input>
                </div>
            </div>
        </form>
        </div>
    )
}


export default FlightSearch;
