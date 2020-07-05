/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  Input,
  ModalFooter,
  ModalBody,
  Row,
  Col,
} from "reactstrap";
import ChangePassword from "./ChangePassword";

function AdminNavbar(props) {
  const [collapseOpen, setCollapseOpen] = useState(false)
  const [modalPassword, modalPasswordSetter] = useState(false)
  const [color, setColor] = useState('navbar-transparent')


  useEffect(() => {
    window.addEventListener("resize", updateColor);
    return () => {
      window.removeEventListener("resize", updateColor);
    }
  }, [])
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setColor('bg-white');
    } else {
      setColor('navbar-transparent');
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setColor('navbar-transparent');
    } else {
      setColor('bg-white');
    }
    setCollapseOpen(prev => !prev)
  };
  // this function is to open the modal	
  const toggleModalSearch = () => {
    modalPasswordSetter(prev => !prev)
  };

  return (
    <>
      <Navbar
        className={classNames("navbar-absolute", color)}
        expand="lg"
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened
              })}
            >
              <button
                className="navbar-toggler"
                type="button"
                onClick={props.toggleSidebar}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <button
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navigation"
            data-toggle="collapse"
            id="navigation"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <InputGroup className="search-bar">
                <Button
                  className="btn remove btn-primary"
                  onClick={() => null}
                  color="link">
                  {localStorage.getItem('user-name')}
                </Button>
              </InputGroup>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <div className="photo">
                    <img alt="..." src={require("assets/img/anime3.png")} />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <DropdownItem className="nav-item"
                    data-target="#passwordModal"
                    data-toggle="modal"
                    id="changePasssword"
                    onClick={toggleModalSearch}>
                    Change Password</DropdownItem>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" onClick={(e) => {
                      e.preventDefault()
                      localStorage.removeItem('login-token')
                      props.history.push('/auth/login')
                    }}>Log out</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container >
      </Navbar >
      <Modal
        modalClassName="modal-black"
        isOpen={modalPassword}
        toggle={toggleModalSearch}
      >
        <ChangePassword toggleModalSearch={toggleModalSearch} />
      </Modal>
    </>
  );
}

export default AdminNavbar;
