import React, { useRef } from "react";

// reactstrap components
import {
    Card,
    CardBody,
    Row,
    Col,
    CardHeader,
    CardTitle,
} from "reactstrap";
import DataTable from 'react-data-table-component'
import { gethotBalls, delelteHotBall } from '../apollo/server'
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { customStyle } from "../assets/custom/custom";
import { Loader } from "../assets/custom/Spinner";
import ActionButton from '../components/ActionButton/ActionButton'
import NotificationAlert from "react-notification-alert";
import HotBallComponent from "components/HotBallComponent/HotBallComponent";
import { favouriteTimeTransformation } from "utils/stringManipulation";
import { favouriteBallTransformation } from "utils/stringManipulation";

const GET_BALLS = gql`${gethotBalls}`
const DELETE_BALLS = gql`${delelteHotBall}`

function HotBalls() {
    const notifyEl = useRef(null);
    const { loading, data: ballData } = useQuery(GET_BALLS)
    function showMessage(message, category) {
        notifyEl.current.notificationAlert(options(message, category));
    }
    const columns = [
        {
            name: 'Lottery Name',
            selector: 'name',
            sortable: true,
            center: true
        },
        {
            name: 'Hot Balls',
            selector: 'coldBall',
            center: true,
            format: row => favouriteBallTransformation(row.hotBall)
        },
        {
            name: ' Times',
            selector: 'coldBall',
            center: true,
            format: row => favouriteTimeTransformation(row.hotBall)
        },
        {
            name: 'Action',
            center: true,
            cell: row => <ActionButton
                deleteButton={true}
                editButton={false}
                row={row}
                mutation={DELETE_BALLS}
                editModal={null}
                refetchQuery={GET_BALLS}
                showMessage={showMessage}
                message='Favourite Ball removed' />
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
    console.log('ColdView')

    return (
        <div className="content">
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notifyEl} />
            </div>
            <Row className='justify-content-center'>
                <Col md='10'>
                    <HotBallComponent showMessage={showMessage} />
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Hot Ball Numbers</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                theme='dark'
                                title=""
                                columns={columns}
                                data={ballData ? ballData.lottery : []}
                                defaultSortField="name"
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
        </div>
    )

}
export default React.memo(HotBalls);