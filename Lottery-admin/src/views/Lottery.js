import React, { useState } from "react";

// reactstrap components
import {
    Button,
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
import { getlottery } from '../apollo/server'
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { customStyle } from "../assets/custom/custom";
import { Loader } from "../assets/custom/Spinner";
import { dateToCustom } from "../variables/date";
const GET_LOTTERY = gql`${getlottery}`

function Lottery(props) {
    const [editModal, editModalSetter] = useState(false)
    const [lottery, lotterySetter] = useState(null)
    const { loading, data: LotteryData } = useQuery(GET_LOTTERY)
    const [alert, alertSetter] = useState(true)

    const toggleModal = rowdata => {
        editModalSetter(prev => !prev)
        lotterySetter(rowdata)
    }
    function actionButtons(row) {
        return (
            <>
                <Button className='btn-icon btn-link remove btn btn-warning btn-sm'
                    onClick={e => {
                        e.preventDefault()
                        toggleModal(row)
                    }}>
                    <i className="fas fa-edit"></i>
                </Button>
              &nbsp;&nbsp;
                <Button className='btn-icon btn-link remove btn btn-danger btn-sm'>
                    <i className="fas fa-times"></i>
                </Button>
            </>
        )
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
            format: row => dateToCustom(row.next_draw)
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
            cell: row => <>{actionButtons(row)}</>
        }
    ]
    console.log('LotteryView')

    return (
        <div className="content">
            <Alert
                color="default"
                isOpen={alert}
                toggle={() => alertSetter(prev => !prev)}
            >
                You will get the list of icons <a href='https://fontawesome.com/icons?d=gallery' className='btn-icon btn-link btn-danger'>Font Awesome 5</a>
            </Alert>
            <Row className='justify-content-center'>
                <Col md='10'>
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
export default Lottery;