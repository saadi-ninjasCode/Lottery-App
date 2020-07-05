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
} from "reactstrap";
import DataTable from 'react-data-table-component'
import { adminUsers } from '../apollo/server'
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { customStyle } from "../assets/custom/custom";
import { Loader } from "../assets/custom/Spinner";
import AdminComponent from "../components/AdminComponent/AdminComponent";
const ADMIN_USERS = gql`${adminUsers}`

function AdminUser() {
    const [editModal, editModalSetter] = useState(false)
    const [adminUser, adminUserSetter] = useState(null)
    const { loading, data: userData } = useQuery(ADMIN_USERS)

    const toggleModal = rowdata => {
        editModalSetter(prev => !prev)
        adminUserSetter(rowdata)
    }
    function actionButtons(row) {
        return (
            <Button className='btn-icon btn-link remove btn btn-danger btn-sm'>
                <i className="fas fa-times"></i>
            </Button>
        )
    }
    const columns = [
        {
            name: 'Name',
            selector: 'name',
            center: true
        },
        {
            name: 'Email',
            selector: 'email',
            center: true,
        },
        {
            name: 'Action',
            center: true,
            cell: row => <>{actionButtons(row)}</>
        }
    ]
    console.log('Admin User View')

    return (
        <div className="content">
            <Row className='justify-content-center'>
                <Col md='10'>
                    <AdminComponent />
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Admin Users</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                theme='dark'
                                title=""
                                columns={columns}
                                data={userData ? userData.adminUsers : []}
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
                <AdminComponent adminUser={adminUser} />
            </Modal>
        </div>
    )

}
export default React.memo(AdminUser);