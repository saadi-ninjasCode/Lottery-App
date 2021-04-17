import React, { useRef } from "react";

// reactstrap components
import { Card, CardBody, Row, Col, CardHeader, CardTitle } from "reactstrap";
import DataTable from "react-data-table-component";
import { adminUsers, deleteAdminLogin } from "../apollo/server";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { customStyle } from "../assets/custom/custom";
import { Loader } from "../assets/custom/Spinner";
import AdminComponent from "../components/AdminComponent/AdminComponent";
import NotificationAlert from "react-notification-alert";
import ActionButton from "../components/ActionButton/ActionButton";

const ADMIN_USERS = gql`
  ${adminUsers}
`;
const ADMIN_DELETE = gql`
  ${deleteAdminLogin}
`;

function AdminUser() {
  const notifyEl = useRef(null);
  const { loading, data: userData } = useQuery(ADMIN_USERS);

  function showMessage(message, category) {
    notifyEl.current.notificationAlert(options(message, category));
  }

  const columns = [
    {
      name: "Name",
      selector: "name",
      center: true,
    },
    {
      name: "Email",
      selector: "email",
      center: true,
    },
    {
      name: "Role",
      selector: "role",
      center: true,
      style: { textTransform: "capitalize" },
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <ActionButton
          deleteButton={true}
          row={row}
          mutation={ADMIN_DELETE}
          refetchQuery={ADMIN_USERS}
          showMessage={showMessage}
          message="User removed"
        />
      ),
    },
  ];

  //Notification alert
  var options = (message, category) => ({
    place: "tr",
    message: (
      <div>
        <b>{category === "danger" ? "Error: " : "Success: "}</b>
        {message}
      </div>
    ),
    type: category,
    autoDismiss: 7,
    icon: "far fa-bell",
  });

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notifyEl} />
      </div>
      <Row className="justify-content-center">
        <Col md="10">
          <AdminComponent notification={showMessage} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Admin Users</CardTitle>
            </CardHeader>
            <CardBody>
              <DataTable
                theme="dark"
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
    </div>
  );
}
export default React.memo(AdminUser);
