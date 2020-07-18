import React, { useState } from "react";
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
    Col,
    Label
} from "reactstrap";

function LunchTimeComponent(props) {
    const [pending, pendingSetter] = useState(false)
    function myFunction(val) {
        if (val.target.checked)
            pendingSetter(true)
        if (val.target.checked === false)
            pendingSetter(false)
    }

    return (
        <Card>
            <CardHeader>
                <h5 className="title">Add New Lottery Numbers</h5>
            </CardHeader>
            <CardBody>
                <Form>
                    <Row>
                        <Col className="pr-md-3" md="12">
                            <FormGroup>
                                <label className='ml-md-3'>Date  <i className='tim-icons icon-calendar-60'></i></label>
                                <Input
                                    placeholder="e.g 1"
                                    type="date"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-md-3" md="12">
                            <FormGroup>
                                <label className='ml-md-3'>1st Ball</label>
                                <Input
                                    disabled={pending}
                                    placeholder="e.g 1"
                                    type="number"
                                    min="1" max="50"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-md-3" md="12">
                            <FormGroup>
                                <label className='ml-md-3'>2nd Ball</label>
                                <Input
                                    disabled={pending}
                                    placeholder="e.g 2"
                                    type="number"
                                    min="1" max="50"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-md-3" md="12">
                            <FormGroup>
                                <label className='ml-md-3'>3rd Ball</label>
                                <Input
                                    disabled={pending}
                                    placeholder="e.g 3"
                                    type="number"
                                    min="1" max="50"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-md-3" md="12">
                            <FormGroup>
                                <label className='ml-md-3'>4th Ball</label>
                                <Input
                                    disabled={pending}
                                    placeholder="e.g 4"
                                    type="number"
                                    min="1" max="50"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-md-3" md="12">
                            <FormGroup>
                                <label className='ml-md-3'>5th Ball</label>
                                <Input
                                    disabled={pending}
                                    placeholder="e.g 5"
                                    type="number"
                                    min="1" max="50"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-md-3" md="12">
                            <FormGroup>
                                <label className='ml-md-3'>6th Ball</label>
                                <Input
                                    disabled={pending}
                                    placeholder="e.g 6"
                                    type="number"
                                    min="1" max="50"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-md-3" md="12">
                            <FormGroup>
                                <label className='ml-md-3'>Bonus Ball</label>
                                <Input
                                    disabled={pending}
                                    placeholder="e.g 7"
                                    type="number"
                                    min="1" max="50"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input value='check' type="checkbox" onChange={(e) => myFunction(e)} />
                                    <span className="form-check-sign">
                                        <span className="check" />
                                    </span>
                                    <h5 className="title ml-md-3 title" >Result Pending</h5>
                                </Label>

                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
            <CardFooter className='text-center'>
                <Button className="btn-fill" color="primary" type="submit">
                    Save
                  </Button>
            </CardFooter>
        </Card>
    )

}

export default LunchTimeComponent;