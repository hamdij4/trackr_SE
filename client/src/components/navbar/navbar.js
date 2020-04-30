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
            <NavbarBrand href="/">Trackr</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse 
              isOpen={isOpen} 
              navbar 
              className="navlink-container"
              style={{justifyContent: "end"}}>
                <div>
                <Nav className="mr-auto" navbar style={{fontSize: "14px"}}>
                  <NavItem>
                    <NavLink href="/components/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">Tasks</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">Projects</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Account
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        Profile
                      </DropdownItem>
                      <DropdownItem>
                        Friends
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Settings
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem>
                    <NavLink href="/components/">Logout</NavLink>
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