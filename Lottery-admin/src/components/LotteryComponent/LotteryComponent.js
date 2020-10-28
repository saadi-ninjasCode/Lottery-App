import React, { useState, useRef } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
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
import { createLottery, editLottery, getlottery } from '../../apollo/server'
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import NotificationAlert from "react-notification-alert";
import moment from 'moment-timezone'

// moment.tz.setDefault('Pacific/Niue');
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

const CREATE_LOTTERY = gql`${createLottery}`
const EDIT_LOTTERY = gql`${editLottery}`
const GET_LOTTERY = gql`${getlottery}`
function LotteryComponent(props) {

    // console.log('moment: ', moment(1603710000000).format())
    const form = useRef()
    const notifyEl = useRef(null);
    const MUTATION = props.lottery ? EDIT_LOTTERY : CREATE_LOTTERY
    const [iconFocus, iconFocusSetter] = useState(false)
    const [nameError, nameErrorSetter] = useState(null)
    const [iconError, iconErrorSetter] = useState(null)
    const [dateError, setDateError] = useState(null)
    const name = props.lottery ? props.lottery.name : ''

    const [date, dateSetter] = useState(props.lottery ? moment(+props.lottery.next_draw) : '')
    const [iconName, iconNameSetter] = useState(props.lottery ? props.lottery.icon_name ? props.lottery.icon_name : '' : 'mug-hot')
    const [mutation, { loading }] = useMutation(MUTATION, { onCompleted, onError, refetchQueries: [{ query: GET_LOTTERY }] })

    function onCompleted(data) {
        console.log(data)
        if (!props.lottery) {
            form.current.reset()
        }
        showMessage('Lottery Type Added', 'success')
        nameErrorSetter(null)
        iconErrorSetter(null)
        setDateError(null)
    }
    function onError(QueryError) {
        console.log(QueryError)
        nameErrorSetter(null)
        iconErrorSetter(null)
        setDateError(null)
        let errorMesage = ''
        try {
            if (QueryError.graphQLErrors.length > 0)
                errorMesage = QueryError.graphQLErrors[0].message
            else if (QueryError.networkError)
                errorMesage = QueryError.networkError.result.errors[0].message
        } catch (err) {
            errorMesage = 'Something went wrong.'
        }
        showMessage(errorMesage, 'danger')
    }
    function showMessage(message, category) {
        notifyEl.current.notificationAlert(options(message, category));
    }
    function onBlur(setter, field, state) {
        setter(!validateFunc({ [field]: state }, field))
    }

    // function dateChange(date) {
    //     dateSetter(date.format("DD MMMM YYYY, hh:mm A"))
    //     console.log("save:", date)
    // }
    function validate() {
        if (moment(date, "DD MMMM YYYY, hh:mm A ", true).isValid()) {
            if (date.isBefore(moment().startOf('hour'))) {
                showMessage("Date cann't be less than current date", 'danger')
                setDateError(false)
                return false
            }
        }
        else {
            showMessage("Invalid Date Format", 'danger')
            setDateError(false)
            return false
        }
        const nameError = !validateFunc({ name: form.current['input-name'].value }, 'name')
        const iconError = !validateFunc({ iconName: form.current['input-icon'].value }, 'iconName')
        nameErrorSetter(nameError)
        iconErrorSetter(iconError)
        return nameError && iconError
    }
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

    function validationDay(current) {
        return current.isSameOrAfter(moment(), 'days')
    }

    console.log('LotteryComponent')
    return (
        <>
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notifyEl} />
            </div>
            <Row>
                <Col>
                    <Card>
                        <form ref={form}>
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
                                                name='input-name'
                                                placeholder="Lucky Draw"
                                                defaultValue={name}
                                                type="text"
                                                onBlur={(event) => {
                                                    onBlur(nameErrorSetter, 'name', event.target.value)
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-md-3" md="12">
                                        <label className='form-control-label' htmlFor="input-date"> Next Draw Date
                                        <i>&nbsp; (Europe/London)</i>
                                        </label>
                                        <br />
                                        <FormGroup className={
                                            dateError === null
                                                ? ''
                                                : dateError
                                                    ? 'has-success'
                                                    : 'has-danger'
                                        }>
                                            <Datetime
                                                id="input-date"
                                                name='input-date'
                                                value={date}
                                                initialViewDate={date ? date : moment()}
                                                onOpen={() => (!date ? dateSetter(moment()) : null)}
                                                isValidDate={validationDay}
                                                dateFormat={"DD MMMM YYYY,"}
                                                timeFormat={"hh:mm A"}
                                                input={true}
                                                locale='en'
                                                inputProps={{
                                                    placeholder: "Click to select a date"
                                                }}
                                                onChange={d => dateSetter(d)}
                                            />
                                        </FormGroup>
                                        {/* <FormGroup>
                                             <DatePicker
                                                id="input-date"
                                                name='input-date'
                                                placeholderText="Click to select a date"
                                                className='form-control'
                                                selected={date}
                                                // onChange={e => dateSetter(e)}
                                                onChange={dateChange}
                                                timeInputLabel="Time:"
                                                showTimeInput
                                                dateFormat="dd MMMM yyyy, h:mm aa"
                                                minDate={new Date()}
                                                openToDate={new Date()}
                                                isClearable
                                                withPortal={props.lottery ? false : true}
                                                locale='en'
                                            />
                                      </FormGroup> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-md-3" md="12">
                                        <label className="form-control-label" htmlFor="input-icon"> Icon Name</label>
                                        <InputGroup className={classNames(
                                            iconError === null ? '' : iconError ? 'has-success' : 'has-danger',
                                            { "input-group-focus": iconFocus })
                                        }>
                                            <InputGroupAddon addonType="prepend" >
                                                <InputGroupText><i className={"fas fa-" + iconName}></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id="input-icon"
                                                name='input-icon'
                                                type="text"
                                                placeholder="Expo Icon Name"
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
                                <Button
                                    className="btn-fill"
                                    color="primary"
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (validate() & !loading)
                                            mutation({
                                                variables: {
                                                    lotteryInput: {
                                                        _id: props.lottery ? props.lottery._id : '',
                                                        name: form.current['input-name'].value,
                                                        next_draw: date,
                                                        icon_name: form.current['input-icon'].value
                                                    }
                                                }
                                            })
                                    }}
                                >
                                    {loading ? <i className='fas fa-compact-disc fa-spin fa-2x fa-fw' /> :
                                        'Save'
                                    }

                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </Col>
            </Row >
        </>
    )

}

export default React.memo(LotteryComponent)