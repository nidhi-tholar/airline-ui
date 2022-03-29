import { useLocation } from 'react-router-dom';
import "../styles/bookFlight.css";

const BookFlight = (props) =>{

    const location = useLocation()
    const { flight } = location.state
    console.log(flight)

    return (
        <div className='bookingContainer'>
            <div className='row'>
                <span>{flight.departure_airport.code} - {flight.arrival_airport.code}</span>
            </div>

            <div className='row'>
                <span>{flight.departure_airport.city} - {flight.arrival_airport.city}</span>
            </div>

            <div className='row'>
                <span>{flight.departure_airport.name} - {flight.arrival_airport.name}</span>
            </div>
        </div>
    );
}

export default BookFlight;