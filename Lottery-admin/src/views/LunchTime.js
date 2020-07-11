import React, { useState } from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    CardTitle,
    Table,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader,
} from "reactstrap";
import LunchTimeComponent from "../components/LunchTimeComponent/LunchTimeComponent";
import FavouriteBallComponent from "components/FavouriteBallComponent/FavouriteBallComponent";

function LunchTime(props) {
    const [luchTime, luchTimeSetter] = useState(null)
    const [editModal, editModalSetter] = useState(false)

    const toggleModal = (value) => {
        luchTimeSetter(value)
        editModalSetter(prev => !prev)
    }

    return (
        <div className="content">
            <Row>
                <Col md='8'>
                    <h2 className="blockquote blockquote-primary" style={{ fontSize: 'x-large' }}>Lunch Time</h2>
                    <LunchTimeComponent />
                </Col>
                <Col md='4'>
                    <FavouriteBallComponent />
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Previous Results</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Table className="table table-hover" responsive hover={true}>
                                <thead className="thead-light">
                                    <tr>
                                        <th>Date</th>
                                        <th>Lottery Balls</th>
                                        <th>fdasf</th>
                                        <th className="text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Dakota Rice</td>
                                        <td>Niger</td>
                                        <td>Oud-Turnhout</td>
                                        <td className="text-right">
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    className="btn-icon-only text-light"
                                                    href="#pablo"
                                                    role="button"
                                                    size="sm"
                                                    color=""
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fas fa-ellipsis-v" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={e => {
                                                            e.preventDefault()
                                                            toggleModal(luchTime)
                                                        }
                                                        }>
                                                        Edit
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href="#pablo">
                                                        Delete
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Minerva Hooper</td>
                                        <td>Curaçao</td>
                                        <td>Sinaai-Waas</td>
                                        <td className="text-center">$23,789</td>
                                    </tr>
                                    <tr>
                                        <td>Sage Rodriguez</td>
                                        <td>Netherlands</td>
                                        <td>Baileux</td>
                                        <td className="text-center">$56,142</td>
                                    </tr>
                                    <tr>
                                        <td>Philip Chaney</td>
                                        <td>Korea, South</td>
                                        <td>Overland Park</td>
                                        <td className="text-center">$38,735</td>
                                    </tr>
                                    <tr>
                                        <td>Doris Greene</td>
                                        <td>Malawi</td>
                                        <td>Feldkirchen in Kärnten</td>
                                        <td className="text-center">$63,542</td>
                                    </tr>
                                    <tr>
                                        <td>Mason Porter</td>
                                        <td>Chile</td>
                                        <td>Gloucester</td>
                                        <td className="text-center">$78,615</td>
                                    </tr>
                                    <tr>
                                        <td>Jon Porter</td>
                                        <td>Portugal</td>
                                        <td>Gloucester</td>
                                        <td className="text-center">$98,615</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal
                className="modal-dialog-centered"
                size="lg"
                isOpen={editModal}
                toggle={() => { toggleModal() }}
            >
                <ModalHeader toggle={toggleModal} charCode="X"><h3 className="title mb-md-4" style={{ fontSize: 'large' }}>Update</h3></ModalHeader>
                <LunchTimeComponent luchTime={luchTime} />
            </Modal>
        </div>
    )

}
export default LunchTime;