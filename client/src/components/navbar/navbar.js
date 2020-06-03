import React, { useState } from 'react';
import {
  Container, Row, Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';

const TrackrNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div  style={{backgroundColor: "#f8f8f8"}}>
      <Container  style={{maxWidth: "78%"}}>
        <Row>
          <Col>
          <Navbar color="light" light expand="md">
            <NavbarBrand  tag={Link} to="/">Trackr</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse 
              isOpen={isOpen} 
              navbar 
              className="navlink-container"
              style={{justifyContent: "end"}}>
                <div>
                <Nav className="mr-auto" navbar style={{fontSize: "14px"}}>
                  <NavItem>
                    <NavLink tag={Link} to="/home">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/projects">History</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/settings">Settings</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/">Logout</NavLink>
                  </NavItem>
                </Nav>
                </div>
              {/* <NavbarText>Simple Text</NavbarText> */}
            </Collapse>
          </Navbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TrackrNavbar;
