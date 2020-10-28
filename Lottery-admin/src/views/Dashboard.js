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
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// reactstrap components
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col
} from "reactstrap";
import { gql } from "apollo-boost";
import { dasboardInfo } from "apollo/server";
import { useQuery } from "@apollo/react-hooks";
import { Loader } from "../assets/custom/Spinner";
import { dateTransformation } from "utils/stringManipulation";
import CountDown from "components/CountDown/CountDown";


const GET_LOTTERY = gql`${dasboardInfo}`


function Dashboard(props) {

    const { loading, data: LotteryData, error } = useQuery(GET_LOTTERY)
    console.log(LotteryData)
    if (error) return <div className="content text-center text-white" ><h1>Error.</h1></div>
    if (loading) return <div className="content text-center text-white" ><Loader /></div>
    return (
        <div className='content'>
            <Row className="mt-7" >
                <Col className="mb-lg-5 mb-sm-3" xl="6" >
                    <Card className="mb-4 mb-lg-0 bg-light">
                        <CardBody>
                            <Row className="align-items-center">
                                <div className="col">
                                    <CardTitle className="text-uppercase text-default font-weight-bold mb-0">
                                        {'Total Lotteries'}
                                    </CardTitle>
                                    <span className="h2 text-primary font-weight-bold mb-0">
                                        {LotteryData ? LotteryData.dasboardInfo.length : "0"}
                                    </span>
                                </div>
                                <Col className="col-auto">
                                    <div className="text-white p-2 bg-info rounded-circle ">
                                        <i className="fas fa-glasses fa-2x fa-fw" />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col className="mb-lg-5 mb-sm-3" xl="6" >
                    <Card className="mb-4 mb-lg-0 bg-light">
                        <CardBody>
                            <Row className="align-items-center">
                                <div className="col">
                                    <CardTitle className="text-uppercase text-default font-weight-bold mb-0">
                                        {'Total Users'}
                                    </CardTitle>
                                    <span className="h2 text-primary font-weight-bold mb-0">
                                        {LotteryData.dasboardInfo.map(x => x.lottery.user_list.length).reduce((a, b) => a + b, 0)}
                                    </span>
                                </div>
                                <Col className="col-auto">
                                    <div className="text-white p-2 bg-info rounded-circle ">
                                        <i className="far fa-user fa-2x fa-fw"></i>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-7" >
                {LotteryData.dasboardInfo.map((item, index) => (
                    <Col className="mb-lg-5 mb-sm-3 p-2" xl="6" key={index} >
                        <Card className="mb-4 mb-lg-0 p-2">
                            <CardBody>
                                <Row className="align-items-center">
                                    <div className="col">
                                        <CardTitle className="text-uppercase mb-0">
                                            {item.lottery.name}
                                        </CardTitle>
                                    </div>
                                    <Col className="col-auto">
                                        <div className="text-white p-2 bg-info rounded-circle ">
                                            <i className={classNames("fas", "fa-" + item.lottery.icon_name, "fa-2x fa-fw")} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="col">
                                        <CardBody>
                                            <p>
                                                <span className="text-info">
                                                    {'Total User:'}
                                                </span>
                                                <span className="ml-4 text-primary">
                                                    {item.lottery.user_list.length}
                                                </span>
                                            </p>
                                            <p>
                                                <span className="text-info">
                                                    {'Last Draw:'}
                                                </span>
                                                <span className="ml-4 text-primary">
                                                    {dateTransformation(item.draw ? item.draw.date : null, true)}
                                                </span>
                                            </p>
                                            <p>
                                                <span className="text-info">
                                                    {'Next Draw:'}
                                                </span>
                                                <span className="ml-4 text-primary">
                                                    {dateTransformation(item.lottery.next_draw, true)}
                                                </span>
                                            </p>
                                            <p>
                                                <span className="text-info">
                                                    {'Time Zone:'}
                                                </span>
                                                <span className="ml-4 text-primary">
                                                    {'Europe/London'}
                                                </span>
                                            </p>
                                        </CardBody>
                                    </div>
                                </Row>
                                <CountDown time={item.lottery.next_draw} name={item.lottery.name} />
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Dashboard;
