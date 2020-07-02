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
    Label,
    InputGroupAddon,
    InputGroup,
    InputGroupText
} from "reactstrap";
import DatePicker from "react-datepicker";
import classnames from 'classnames'

import "react-datepicker/dist/react-datepicker.css";

function LotteryComponent(props) {
    const [name, nameSetter] = useState(props.lottery ? props.lottery.name : '')
    const [date, dateSetter] = useState(props.lottery ? new Date(props.lottery.next_draw) : '')
    const [iconName, iconNameSetter] = useState(props.lottery ? props.lottery.iconName : 'fas fa-glasses')
    const [iconFocus, iconFocusSetter] = useState(false)

    return (
        <Row>
            <Col>
                <Card>
                    <Form>
                        <CardHeader>
                            <h5 className="h3">{props.lottery ? 'Edit Lottery Type' : 'Add New Lottery Type'}</h5>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col className="pr-md-3" md="12">
                                    <FormGroup>
                                        <label className='ml-md-3'>Lottery Name</label>
                                        <Input
                                            required={true}
                                            placeholder="Lucky Draw"
                                            type="text"
                                            value={name}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-md-3" md="12">
                                    <FormGroup>
                                        <label className='ml-md-12'> Next Draw Date  <i className='tim-icons icon-calendar-60'></i></label>
                                        <br />
                                        <DatePicker
                                            placeholderText="Click to select a date"
                                            className='form-control'
                                            selected={date}
                                            onChange={e => dateSetter(e)}
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            dateFormat="dd MMMM yyyy, h:mm aa"
                                            minDate={new Date()}
                                            openToDate={new Date()}
                                            isClearable
                                            withPortal={props.lottery ? false : true}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-md-3" md="12">
                                    <label className='ml-md-12'> Icon Name</label>
                                    <InputGroup className={classnames({
                                        "input-group-focus": iconFocus
                                    })}>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className={iconName}></i></InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            type="text"
                                            placeholder="With Font Awesome 5 Icons"
                                            value={iconName}
                                            onFocus={e => iconFocusSetter(true)}
                                            onBlur={e => iconFocusSetter(false)}
                                        />

                                    </InputGroup>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className='text-center'>
                            <Button className="btn-fill" color="primary" type="submit">
                                Save
                  </Button>
                        </CardFooter>
                    </Form>
                </Card>
            </Col>
        </Row >
    )

}

export default LotteryComponent;