import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { serverV1Instance } from '../../config/axios';
import { userAuth } from '../../utils/userAuth';

const NavbarMenu = ({ style }) => {
    const [data, setData] = useState();

    const token = userAuth();
    const handleLogOut = () => {
        localStorage.clear();
        window.location.href = "/login"
    }

    const getUserProfile = async () => {
        const res = await serverV1Instance.get('user/get-user');
        if (res.status === 200) {
            setData(res.data.data);
        }
    }

    useEffect(() => {
        if (token) {
            getUserProfile();
        } else {
            window.href = '/login'
        }
    }, [])


    const { bg, variant } = style
    return (
        <Navbar collapseOnSelect expand="lg" bg={bg} variant={variant}>
            <Container>
                <Navbar.Brand href="/">Theme</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/#">theme</Nav.Link>

                    </Nav>
                    <Nav>
                        {
                            !userAuth() ?
                                <React.Fragment>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/signup">SignUP</Nav.Link>
                                </React.Fragment>

                                :
                                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                    {data && <NavDropdown.Item href="/">
                                        Hello, {data.firstName}
                                    </NavDropdown.Item>}
                                    <NavDropdown.Item href="#">
                                        userProfile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogOut()}>signOut</NavDropdown.Item>

                                </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarMenu