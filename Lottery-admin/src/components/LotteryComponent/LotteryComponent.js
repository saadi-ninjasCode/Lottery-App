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
    InputGroupAddon,
    InputGroup,
    InputGroupText
} from "reactstrap";
import DatePicker from "react-datepicker";
import classNames from 'classnames'

import "react-datepicker/dist/react-datepicker.css";
import { validateFunc } from "../../constraint/constraint";

function LotteryComponent(props) {
    const [name, nameSetter] = useState(props.lottery ? props.lottery.name : '')
    const [date, dateSetter] = useState(props.lottery ? new Date(+props.lottery.next_draw) : '')
    const [iconName, iconNameSetter] = useState(props.lottery ? props.lottery.icon_name : 'fas fa-glasses')
    const [iconFocus, iconFocusSetter] = useState(false)
    const [nameError, nameErrorSetter] = useState(null)
    const [iconError, iconErrorSetter] = useState(null)


    function onBlur(setter, field, state) {
        setter(!validateFunc({ [field]: state }, field))
    }

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
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-name">
                                        Lottery Name
                                    </label>
                                    <FormGroup className={
                                        nameError === null
                                            ? ''
                                            : nameError
                                                ? 'has-success'
                                                : 'has-danger'
                                    }>
                                        <Input
                                            id="nput-name"
                                            placeholder="Lucky Draw"
                                            type="text"
                                            value={name}
                                            onChange={event => {
                                                nameSetter(event.target.value)
                                            }}
                                            onBlur={(event) => {
                                                onBlur(nameErrorSetter, 'name', name)
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-md-3" md="12">
                                    <label className='className="form-control-label' htmlFor="input-date"> Next Draw Date</label>
                                    <br />
                                    <FormGroup>
                                        <DatePicker
                                            id="input-date"
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
                                    <label className="form-control-label" htmlFor="input-icon"> Icon Name</label>
                                    <InputGroup className={classNames(
                                        iconError === null ? '' : iconError ? 'has-success' : 'has-danger',
                                        { "input-group-focus": iconFocus })
                                    }>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className={iconName}></i></InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id="input-icon"
                                            type="text"
                                            placeholder="Font Awesome 5 Icons"
                                            value={iconName}
                                            onFocus={e => iconFocusSetter(true)}
                                            onBlur={e => {
                                                iconFocusSetter(false)
                                                onBlur(iconErrorSetter, 'iconName', iconName)
                                            }}
                                            onChange={(e) => iconNameSetter(e.target.value)}
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