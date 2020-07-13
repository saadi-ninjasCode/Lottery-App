import React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";

function FavouriteBallComponent(props) {
    return (
        <>
            <Card>
                <CardHeader>
                    <h4 className="title text-warning">Hot Balls</h4>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row>
                            <Col md='12'>
                                <p className="text-center">1st Ball</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-1" md="6">
                                <FormGroup>
                                    <Input
                                        placeholder="Ball 1"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pr-md-2" md="6">
                                <FormGroup>
                                    <Input
                                        placeholder="Times"
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='12'>
                                <p className="text-center">2nd Ball</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-1" md="6">
                                <FormGroup>
                                    <Input
                                        placeholder="Ball 2"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pr-md-2" md="6">
                                <FormGroup>
                                    <Input
                                        placeholder="Times"
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='12'>
                                <p className="text-center">3rd Ball</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-1" md="6">
                                <FormGroup>
                                    <Input
                                        placeholder="Ball 3"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pr-md-2" md="6">
                                <FormGroup>
                                    <Input
                                        placeholder="Times"
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <CardFooter className="text-center">
                            <Button className="btn-fill" color="primary" type="submit">
                                Save
                  </Button>
                        </CardFooter>
                    </Form>
                </CardBody>
            </Card>

            {/* Cold Ball Form */}
            <Card>
                <CardHeader>
                    <h4 className="title text-info">Cold Balls</h4>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row>
                            <Col md='12'>
                                <p className="text-center">1st Ball</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-1" md="6">
                                <FormGroup>
                                    <Input
                                        placeholder="Ball 1"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pr-md-2" md="6">
                                <FormGroup>
                                    <Input
                                        placeholder="Times"
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='12'>
                                <p className="text-center">2nd Ball</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-1" md="6">
                                <FormGroup>
                                    <Input
                                        placeholder="Ball 2"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pr-md-2" md="6">
                                <FormGroup>
                                    <Input
                                        placeholder="Times"
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='12'>
                                <p className="text-center">3rd Ball</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-1" md="6">
                                <FormGroup>
                                    <Input
                                        placeholder="Ball 3"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pr-md-2" md="6">
                                <FormGroup>
                                    <Input
                                        placeholder="Times"
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <CardFooter className="text-center">
                            <Button className="btn-fill" color="primary" type="submit">
                                Save
                  </Button>
                        </CardFooter>
                    </Form>
                </CardBody>
            </Card>
        </>
    )
}

export default FavouriteBallComponent