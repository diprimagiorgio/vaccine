import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";

export const HeaderBar = () => {
    return (
        <Navbar bg="dark" variant="dark" color="primary">
            <Container>
            <Navbar.Brand href="#home" >
                <svg width="46" height="56" xmlns="http://www.w3.org/2000/svg" className="logo">
                    <path d="M0 56V28h14v28H0zm32-28V0h14v28H32zM16 56V0h14v56H16z" fill="#FBFCFC" fill-rule="evenodd"></path>
                </svg>{''}
            Vaccine Report
            </Navbar.Brand>
            </Container>
        </Navbar>
    
    );
};
