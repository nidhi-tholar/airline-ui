import { useLocation } from 'react-router-dom';
import "../styles/bookFlight.css";
import UserNavBar from "./userHeader";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/fontawesome-free-solid';
import { faPlaneDeparture } from '@fortawesome/fontawesome-free-solid';
import { timeConversion, calculateDuration } from "../util";

import { Link } from 'react-router-dom';

const BookFlight = (props) =>{

    const location = useLocation()
    const { flight } = location.state
    console.log(flight)

    return (
        <div>
            <UserNavBar/>

            <div className='bookingContainer'>

                <div>
                    <div className="booking-plane-icon" >
                        <span>{flight.departure_airport.city} &nbsp; 
                        <FontAwesomeIcon icon={faPlane} size="xl"/>  &nbsp;
                        {flight.arrival_airport.city}</span>  
                    </div>
                </div>

                <div className='flight-details'>

                    <div className='first-row'>
                        <div>
                            <FontAwesomeIcon icon="fas fa-calendar-alt" size="lg"/> &nbsp;
                            <span>{flight.departure_date.split(' ').slice(0,4).join(' ')}</span>
                        </div> 

                        <div>
                            <FontAwesomeIcon icon="fas fa-clock" size="lg"/> &nbsp;
                            <span>{calculateDuration(flight.departure_date, flight.departure_time, flight.arrival_date, flight.arrival_time)}</span>
                        </div>

                        <div>
                            <FontAwesomeIcon icon="fas fa-plane" size="lg" transform={{ rotate: 270 }}/> &nbsp;
                            <span>{flight.aircraft.name} -</span> &nbsp; 
                            <span>{flight.flight_num}</span>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-8'>
                        
                            <div className='second-row'>
                                <div className='airport-name'>{flight.departure_airport.code}</div>
                                <div className='airport-name'><FontAwesomeIcon icon="fa-solid fa-arrow-right" size="xs"/></div>
                                <div className='airport-name'>{flight.arrival_airport.code}</div>
                            </div>

                            <div className='third-row'>
                                <div>{timeConversion(flight.departure_time)}</div>
                                <div>{timeConversion(flight.arrival_time)}</div>
                            </div>
                        </div>

                        <div className='col-md-4 price-outer'>
                            <div className='price-holder'>
                                <span className='price-text'>$ {flight.price}</span>
                            </div>
                        </div>
                    </div>

                    <div className='btn-container'>
                        <Link to="/myBookings" state={{ flight: props.flight }}>
                            <input className='btn-book' type="submit" value="Book Flight"></input>
                        </Link>
                    </div>

                </div>
                
            </div>
        </div>
        
    );
}

export default BookFlight;