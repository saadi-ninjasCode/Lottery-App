import React, { useState, useRef } from "react";

// reactstrap components
import {
    Card,
    CardBody,
    Row,
    Col,
    CardHeader,
    CardTitle,
    Modal,
    Alert,
} from "reactstrap";
import DataTable from 'react-data-table-component'
import LotteryComponent from "../components/LotteryComponent/LotteryComponent";
import { getlottery, deleteLottery } from '../apollo/server'
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { customStyle } from "../assets/custom/custom";
import { Loader } from "../assets/custom/Spinner";
import ActionButton from '../components/ActionButton/ActionButton'
import NotificationAlert from "react-notification-alert";
import { dateTransformation } from "../utils/stringManipulation";

const GET_LOTTERY = gql`${getlottery}`
const DELETE_LOTTERY = gql`${deleteLottery}`

function Lottery() {
    const notifyEl = useRef(null);
    const [editModal, editModalSetter] = useState(false)
    const [lottery, lotterySetter] = useState(null)
    const { loading, data: LotteryData } = useQuery(GET_LOTTERY)
    const [alert, alertSetter] = useState(true)

    const toggleModal = rowdata => {
        editModalSetter(prev => !prev)
        lotterySetter(rowdata)
    }
    function showMessage(message, category) {
        notifyEl.current.notificationAlert(options(message, category));
    }
    const columns = [
        {
            name: 'Icon',
            selector: 'icon_name',
            center: true,
            cell: row => <i className={row.icon_name} />
        },
        {
            name: 'Lottery Name',
            selector: 'name',
            sortable: true,
            center: true
        },
        {
            name: 'Next Draw Date',
            selector: 'next_draw',
            sortable: true,
            center: true,
            format: row => dateTransformation(row.next_draw)
        },
        {
            name: 'Total Users',
            selector: 'user_list',
            sortable: true,
            center: true,
            format: row => row.user_list.length
        },
        {
            name: 'Action',
            center: true,
            cell: row => <ActionButton
                deleteButton={true}
                editButton={true}
                row={row}
                mutation={DELETE_LOTTERY}
                editModal={toggleModal}
                showMessage={showMessage}
                refetchQuery={GET_LOTTERY}
                message='Lottery removed' />
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
    console.log('LotteryView')

    return (
        <div className="content">
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notifyEl} />
            </div>
            <Alert
                color="default"
                isOpen={alert}
                toggle={() => alertSetter(prev => !prev)}
            >
                You will get the list of icons <a href='https://fontawesome.com/icons?d=gallery' className='btn-icon btn-link btn-danger'>Font Awesome 5</a>
            </Alert>
            <Row className='justify-content-center'>
                <Col md='10'>
                    <h2 className="blockquote blockquote-primary" style={{ fontSize: 'x-large' }}>Lottery Name</h2>
                    <LotteryComponent />
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Lottery Types</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                theme='dark'
                                title=""
                                columns={columns}
                                data={LotteryData ? LotteryData.lottery : []}
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
            <Modal modalTransition={{ timeout: 400 }} backdropTransition={{ timeout: 200 }}
                modalClassName="modal-black"
                size="lg"
                toggle={() => toggleModal(null)}
                isOpen={editModal}>
                <LotteryComponent lottery={lottery} />
            </Modal>
        </div>
    )

}
export default React.memo(Lottery);