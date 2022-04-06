import { Navbar,Nav, Container, NavDropdown} from 'react-bootstrap';

const UserNavBar = () =>{
    return (
        <div>
            {/* <Navbar bg="dark" variant="dark" sticky="top">
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
                </Navbar> */}

                <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
                <Container>
                    <Navbar.Brand href="/searchFlights">FlyIndigo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title="Nidhi" id="basic-nav-dropdown">
                        <NavDropdown.Item  href="/myBookings"> My Bookings  </NavDropdown.Item>
                        <NavDropdown.Item href="/profile"> My Profile </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/" onClick={()=> {localStorage.removeItem('token');}}> Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
</Navbar>
        </div>
    );
 }

 export default UserNavBar;