import React, { useState, useRef } from "react";

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
import LotteryBallsComponent from "../components/LotteryBallsComponent/LotteryBallsComponent";
import { getlotteryDetails } from "../apollo/server"
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { customStyle } from "../assets/custom/custom";
import { Loader } from "assets/custom/Spinner";
import { dateToCustom } from "variables/date";
import ActionButton from "components/ActionButton/ActionButton";
import DataTable from "react-data-table-component";
import { lotteryBallsTransformation } from "utils/stringManipulation";
import NotificationAlert from "react-notification-alert";

const GET_LOTTERY_DETAILS = gql`${getlotteryDetails}`

function LotteryBalls() {
    const notifyEl = useRef(null);
    const [teaTime, teaTimeSetter] = useState(null)
    const [editModal, editModalSetter] = useState(false)
    const { loading, data: LotteryData } = useQuery(GET_LOTTERY_DETAILS)

    const toggleModal = (value) => {
        teaTimeSetter(value)
        editModalSetter(prev => !prev)
    }
    const columns = [
        {
            name: 'Name',
            selector: 'lottery.name',
            sortable: true,
            center: true
        },
        {
            name: 'Draw Date',
            selector: 'date',
            sortable: true,
            defaultSortAsc: false,
            center: true,
            format: row => dateToCustom(row.lottery.next_draw)
        },
        {
            name: 'Balls',
            selector: 'balls',
            center: true,
            format: row => lotteryBallsTransformation(row.balls, row.pending)
        },
        {
            name: 'Bonus',
            selector: 'specialBalls',
            center: true,
            format: row => lotteryBallsTransformation(row.specialBalls, row.pending)
        },
        {
            name: 'Action',
            center: true,
            cell: row => <ActionButton
                deleteButton={true}
                editButton={true}
                // row={row}
                mutation={null}
                editModal={toggleModal}
                // showMessage={showMessage}
                refetchQuery={GET_LOTTERY_DETAILS}
                message='User removed' />
        }
    ]

    return (
        <div className="content">
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notifyEl} />
            </div>
            <Row className='justify-content-center'>
                <Col md='10'>
                    <h2 className="blockquote blockquote-primary" style={{ fontSize: 'x-large' }}>Lottery Draws</h2>
                    <LotteryBallsComponent />
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Previous Results</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                theme='dark'
                                title=""
                                columns={columns}
                                data={LotteryData ? LotteryData.lotteryBalls : []}
                                defaultSortField="date"
                                noHeader={true}
                                progressPending={loading}
                                progressComponent={<Loader />}
                                highlightOnHover={true}
                                customStyles={customStyle}
                            />
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
                <LotteryBallsComponent luchTime={teaTime} />
            </Modal>
        </div>
    )

}
export default React.memo(LotteryBalls);