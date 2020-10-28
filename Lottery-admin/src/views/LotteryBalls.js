import React, { useState, useRef } from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    CardTitle,
    Modal,
} from "reactstrap";
import LotteryBallsComponent from "../components/LotteryBallsComponent/LotteryBallsComponent";
import { getlotteryDetails, deleteDraw, getTotalDraws } from "../apollo/server"
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { customStyle } from "../assets/custom/custom";
import { Loader } from "assets/custom/Spinner";
import ActionButton from "../components/ActionButton/ActionButton";
import DataTable from "react-data-table-component";
import { lotteryBallsTransformation } from "utils/stringManipulation";
import NotificationAlert from "react-notification-alert";
import { dateTransformation } from "utils/stringManipulation";

const GET_LOTTERY_DETAILS = gql`${getlotteryDetails}`
const GET_TOTAL_DRAW = gql`${getTotalDraws}`
const DELETE_DRAW = gql`${deleteDraw}`

function LotteryBalls() {
    const notifyEl = useRef(null);
    const [balls, ballSetter] = useState(null)
    const [editModal, editModalSetter] = useState(false)
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const { loading: loadingcount, data: totalcount } = useQuery(GET_TOTAL_DRAW)
    const { loading, data: LotteryData } = useQuery(GET_LOTTERY_DETAILS, { variables: { page: page - 1, rows: rowsPerPage } })

    const toggleModal = (value) => {
        ballSetter(value)
        editModalSetter(prev => !prev)
    }
    function showMessage(message, category) {
        notifyEl.current.notificationAlert(options(message, category));
    }
    async function handlePerRowChange(currentRowsPerPage, currentPage) {
        setPage(currentPage)
        setRowsPerPage(currentRowsPerPage)
    }
    async function handlePageChange(page) {
        setPage(page)
    }
    const columns = [
        {
            name: 'Name',
            selector: 'lottery.name',
            sortable: true,
            // center: true
        },
        {
            name: 'Draw Date (Europe/London)',
            selector: 'date',
            sortable: true,
            defaultSortAsc: true,
            center: true,
            format: row => dateTransformation(row.date),

        },
        {
            name: 'Balls',
            selector: 'balls',
            format: row => lotteryBallsTransformation(row.balls, row.pending)
        },
        {
            name: 'Bonus',
            selector: 'specialBalls',
            format: row => lotteryBallsTransformation(row.specialBalls, row.pending)
        },
        {
            name: 'Action',
            center: true,
            cell: row => <ActionButton
                deleteButton={true}
                editButton={true}
                row={row}
                rows={rowsPerPage}
                pageNumber={page}
                mutation={DELETE_DRAW}
                editModal={toggleModal}
                showMessage={showMessage}
                refetchQuery={GET_LOTTERY_DETAILS}
                message='User removed' />
        }
    ]
    //Notification alert
    var options = (message, category) => ({
        place: 'tr',
        message: (
            <div>
                <b>{category === 'danger' ? 'Error: ' : 'Success: '}</b>{message}
            </div>
        ),
        type: category,
        autoDismiss: 7,
        icon: 'far fa-bell'
    })

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
            <Row className='justify-content-center'>
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
                                noHeader={true}
                                progressPending={loading}
                                progressComponent={<Loader />}
                                highlightOnHover={true}
                                customStyles={customStyle}
                                pagination
                                paginationServer
                                paginationTotalRows={!loadingcount && totalcount.drawCount}
                                onChangeRowsPerPage={handlePerRowChange}
                                onChangePage={handlePageChange}
                                paginationPerPage={1}

                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal modalTransition={{ timeout: 400 }} backdropTransition={{ timeout: 200 }}
                size="lg"
                isOpen={editModal}
                toggle={() => toggleModal(null)}>
                <LotteryBallsComponent draw={balls} />
            </Modal>
        </div>
    )

}
export default React.memo(LotteryBalls);