import UserNavBar from "./userHeader";
import '../styles/flightSearch.css';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/fontawesome-free-solid';

const FlightSearch = () =>{

    const flightsResp = [
        {
            "aircraft": {
                "id": "6184aa07c2bf805a6ec51679",
                "name": "Airbus A320"
            },
            "arrival_airport": {
                "city": "San Jose",
                "code": "SJC",
                "id": "61849d3f4367d925b16ff24b",
                "name": "San Jose International Airport"
            },
            "arrival_date": "Sun, 09 Jan 2022 12:20:00 GMT",
            "arrival_time": "12:20",
            "departure_airport": {
                "city": "San Francisco",
                "code": "SFO",
                "id": "61849d5f4367d925b16ff24c",
                "name": "San Francisco International Airport"
            },
            "departure_date": "Sun, 09 Jan 2022 11:00:00 GMT",
            "departure_time": "11:00",
            "flight_num": "AA3457",
            "flight_status": "scheduled",
            "id": "61a26d7d500dc3da968da8f1",
            "price": "40.00",
            "remaining_seats": 59,
            "seat_chart": {
                "aisle": [
                    "1A",
                    "2A"
                ],
                "middle": [
                    "1B"
                ],
                "window": [
                    "W1",
                    "W2"
                ]
            },
            "seat_price": {
                "aisle": 3,
                "middle": 0,
                "window": 5
            },
            "seats": {
                "aisle": 20,
                "middle": 19,
                "window": 16
            }
        },
        {
            "aircraft": {
                "id": "6184aa07c2bf805a6ec51679",
                "name": "Airbus A320"
            },
            "arrival_airport": {
                "city": "San Jose",
                "code": "SJC",
                "id": "61849d3f4367d925b16ff24b",
                "name": "San Jose International Airport"
            },
            "arrival_date": "Sun, 09 Jan 2022 12:20:00 GMT",
            "arrival_time": "12:20",
            "departure_airport": {
                "city": "San Francisco",
                "code": "SFO",
                "id": "61849d5f4367d925b16ff24c",
                "name": "San Francisco International Airport"
            },
            "departure_date": "Sun, 09 Jan 2022 11:00:00 GMT",
            "departure_time": "11:00",
            "flight_num": "AA3457",
            "flight_status": "scheduled",
            "id": "61a26d7d500dc3da968da8f2",
            "price": "40.00",
            "remaining_seats": 59,
            "seat_chart": {
                "aisle": [
                    "1A",
                    "2A"
                ],
                "middle": [
                    "1B"
                ],
                "window": [
                    "W1",
                    "W2"
                ]
            },
            "seat_price": {
                "aisle": 3,
                "middle": 0,
                "window": 5
            },
            "seats": {
                "aisle": 20,
                "middle": 19,
                "window": 16
            }
        }
    ]

    const [flights, setFlights] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const searchFlights = (e) => {
        e.preventDefault();
        setFlights(flightsResp);
        setShowResult(true);
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

    const timeConversion = (time) => {
        var suffix = time.slice(0,2) >= 12 ? "PM":"AM";
        var hours = (( Number(time.slice(0,2)) + 11) % 12 + 1) + time.slice(2,5) +  " " + suffix
        return hours;
    }

    const calculateDuration = (arrTime, deptTime) => {
        arrTime = new Date(arrTime);
        deptTime = new Date(deptTime);
        let diffInMilliSeconds = Math.abs(arrTime - deptTime) / 1000;

          // calculate days
        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;
        console.log('calculated days', days);

        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;
        console.log('calculated hours', hours);

        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;
        console.log('minutes', minutes);

        let difference = '';
        if (days > 0) {
        difference +=  `${days} d`;
        }

        difference += (hours === 0 || hours === 1) ? `${hours}h ` : `${hours}h `;

        difference += (minutes === 0 || hours === 1) ? `${minutes}m` : `${minutes} m`; 

        return difference;
    }
    
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
                            <div>{calculateDuration(props.flight.arrival_date, props.flight.departure_date)}</div>
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


const airports=[{
    "code" : "SJC",
    "name" : "San Jose International Airport",
    "city" : "San Jose"
    },
    {
    "code" : "SFO",
    "name" : "San Francisco International Airport",
    "city" : "San Francisco"
    }          
]

const [departureAirport, setDepartureAirport] = useState("");
const [arrivalAirport, setarrivalAirport] = useState("");
const [departureDate, setDepartureDate] = useState(new Date());

    return (
        <div className="searchForm">
        <form>
            <div className="row">
                <div className="col-md-3">
                    <label className="flight-form-label">From</label>
                </div>

                <div className="col-md-3">
                    <label className="flight-form-label">To</label>
                </div>

                <div className="col-md-3">
                    <label className="flight-form-label">Date</label>
                </div>

                <div className="col-md-3">
                </div>
            </div>

            <div className="row">
                <div className="col-md-3">         
                    <select className="form-fields" value={departureAirport} onChange={(e)=>{setDepartureAirport(e.target.value)}} id="departureAirport" name="departureAirport">
                        <option value="" disabled selected hidden>Origin City</option>
                        {airports.map( (airport) => { return <option value={airport.code}>{airport.city}</option>})}
                    </select>
                </div>

                <div className="col-md-3">         
                    <select className="form-fields" value={arrivalAirport} onChange={(e)=>{setarrivalAirport(e.target.value)}} id="arrivalAirport" name="arrivalAirport">
                        <option value="" disabled selected hidden>Destination City</option>
                        {airports.filter(airport => airport.code !== departureAirport).map( (airport) => { return <option value={airport.code}>{airport.city}</option>})}
                    </select>
                </div>

                <div className="col-md-3">         
                    <DatePicker className="form-fields" value={departureDate} selected={departureDate} onChange={(date) => setDepartureDate(date)} />
                </div>

                <div className="col-md-3">         
                    <input onClick={(e) => props.searchFlights(e)} class="btn-search" type="submit" value="Search Flights"></input>
                </div>
            </div>
        </form>
        </div>
    )
}


export default FlightSearch;
