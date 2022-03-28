import { Navbar,Nav} from 'react-bootstrap';

const UserNavBar = () =>{
    return (
        <div>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Navbar.Brand>FlyIndigo</Navbar.Brand>
                <Nav>
                    <Nav.Link href="/searchFlights"> Home </Nav.Link>
                    <Nav.Link href="/myBookings"> My Bookings  </Nav.Link>
                    <Nav.Link href="/profile"> My Profile </Nav.Link>
                    <Nav.Link onClick ={()=>{
                        // var token=localStorage.getItem('token');
                        // token="";
                        // localStorage.setItem('token',token);
                    }} href="/"> Logout </Nav.Link>
                </Nav>
                </Navbar>
        </div>
    );
 }

 export default UserNavBar;