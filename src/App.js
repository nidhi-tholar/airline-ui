import './App.css';
import { Route, Routes } from 'react-router-dom';
import FlightSearch from "./components/flightSearch";
import BookFlight from './components/booking';
import UserProfile from "./components/userProfile";
import PurchaseSeat from "./components/purchaseSeat";
import Login from "./components/login";
import SignUp from "./components/signup";
import UserBookings from "./components/userBookings";
import AdminFlightStatus from "./components/adminFlightStatus";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/signUp" element={<SignUp/>}></Route>
            <Route path="/searchFlights" element={<FlightSearch/>}></Route>
            <Route path="/booking" element={<BookFlight/>}></Route>
            <Route path="/purchaseSeats" element={<PurchaseSeat/>}></Route>
            <Route path="/profile" element={<UserProfile/>}></Route>
            <Route path="/myBookings" element={<UserBookings/>}></Route>

            <Route path="/adminFlightStatus" element={<AdminFlightStatus/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
