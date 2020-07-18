import React from 'react'
// reactstrap components
import {
    UncontrolledCollapse,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    Input,
    NavbarBrand,
} from 'reactstrap'

function AdminNavbar(props) {
    return (
        <Navbar expand="lg" color='navbar-transparent' >
            <Container className="py-4" fluid>
                <div className="navbar-wrapper">
                    <div
                        className={"navbar-toggle d-inline"}
                    >
                        <button
                            className="navbar-toggler"
                            type="button"
                            id="navbar-collapse-main"
                        >
                            <span className="navbar-toggler-bar bar1" />
                            <span className="navbar-toggler-bar bar2" />
                            <span className="navbar-toggler-bar bar3" />
                        </button>
                    </div>
                    <NavbarBrand href={props.outterLink} className="simple-text" style={{ fontSize: 'large', textTransform: 'capitalize' }} target='_blank'>
                        {props.text}
                    </NavbarBrand>
                </div>
                <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
                    <Row>
                        <Col className="collapse-close" xs="6">
                            <button className="navbar-toggler" id="navbar-collapse-main">
                                <span />
                                <span />
                            </button>
                        </Col>
                    </Row>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            {/* <NavLink className="nav-link-icon" to="/" tag={Link}> */}
                            <NavLink className="nav-link-icon" >
                                <i className="fas fa-globe fa-spin fa-fw" />
                                <span className="nav-link-inner--text">{' Dashboard'}</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <Input
                                type="select"
                                name="select"
                                id="exampleSelect"
                                style={{ color: "grey" }}
                                disabled>
                                <option value="en" >English</option>
                                {/* <option value="de">Deutsche</option>
                                    <option value="zh">中文</option>
                                    <option value="km">ភាសាខ្មែរ</option>
                                    <option value="fr">français</option> */}
                            </Input>
                        </NavItem>
                    </Nav>
                </UncontrolledCollapse>
            </Container>
        </Navbar>
    )
}
export default AdminNavbar
