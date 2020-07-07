import React, { useState, useRef } from "react";
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
import { getlottery } from "../../apollo/server"
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateFunc } from "constraint/constraint";
import NotificationAlert from "react-notification-alert";


const GET_LOTTERY = gql`${getlottery}`

function LotteryBallsComponent(props) {
    const formRef = useRef()
    const notifyEl = useRef(null);
    const { loading: loadingLottery, data: lotteryData, error: lotteryDataError } = useQuery(GET_LOTTERY)
    const [date, dateSetter] = useState(props.lottery ? new Date(+props.lottery.next_draw) : new Date())
    const [pending, pendingSetter] = useState(false)
    //Errors
    const [lotteryError, lotteryErrorSetter] = useState(null)

    const onBlur = (setter, field, state) => {
        setter(!validateFunc({ [field]: state }, field))
    }
    function validate() {
        const lotteryError = !validateFunc({ lotteryDropDown: formRef.current['input-lottery'].value }, 'lotteryDropDown')
        let numberError = []
        if (!pending) {
            Array(8).fill(0).map((item, index) => {
                numberError.push(formRef.current['input-ball' + (index + 1)].value)
            })
        }
        numberError = numberError.filter(Boolean)
        lotteryErrorSetter(lotteryError)
        if (numberError.length <= 5 && !pending) {
            showMessage(" Invalid Data.Tick the 'Pending' or enter at-least 6 numbers", "danger")
        }
        return lotteryError && (!(numberError.length <= 5) || pending)
    }
    function myFunction(val) {
        if (val.target.checked)
            pendingSetter(true)
        if (val.target.checked === false)
            pendingSetter(false)
    }

    function enterData() {
        const lotteryName = formRef.current['input-lottery'].value
        if (!pending) {
            var ballArray = []
            var specialBall = []
            Array(6).fill(0).map((item, index) => {
                ballArray.push(formRef.current['input-ball' + (index + 1)].value)
            })
            ballArray = ballArray.filter(Boolean).map(x => parseInt(x))
            specialBall.push(formRef.current['input-ball7'].value)
            specialBall.push(formRef.current['input-ball8'].value)
            specialBall = specialBall.filter(Boolean).map(x => parseInt(x))

        } else {

        }
    }
    function showMessage(message, category) {
        notifyEl.current.notificationAlert(options(message, category));
    }
    //Notification alert
    var options = (message, category) => ({
        place: 'tr',
        message: (
            <div>
                <b>{category === 'danger' ? 'Error: ' : 'success: '}</b>{message}
            </div>
        ),
        type: category,
        autoDismiss: 7,
        icon: 'far fa-bell'
    })
    console.log("Draw Component")
    return (
        <>
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notifyEl} />
            </div>
            <Card>
                <CardHeader>
                    <h5 className="title">Add New Lottery Numbers</h5>
                </CardHeader>
                <CardBody>
                    <form ref={formRef}>
                        <Row>
                            <Col className="pr-md-3" md="12">
                                <Label htmlFor={'input-lottery'} className='ml-md-3'>
                                    Lottery  <i className='fas fa-glasses'></i>
                                </Label>
                                <FormGroup className={lotteryError === null ? '' : lotteryError ? 'has-success' : 'has-danger'}>
                                    <Input
                                        id={'input-lottery'}
                                        name={'input-lottery'}
                                        type="select"
                                        onBlur={(event) => {
                                            onBlur(lotteryErrorSetter, 'lotteryDropDown', event.target.value)

                                        }}
                                    >
                                        <option value="">{loadingLottery ? 'Loading...' : 'Select'}</option>
                                        {!loadingLottery && lotteryData.lottery.map((item, index) => (
                                            <option
                                                value={item._id}
                                                key={index}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-3" md="12">
                                <Label className='ml-md-3' htmlFor="input-date" >Date  <i className='tim-icons icon-calendar-60'></i></Label>
                                <FormGroup>
                                    <DatePicker
                                        id="input-date"
                                        name='input-date'
                                        placeholderText="Click to select a date"
                                        className='form-control'
                                        selected={date}
                                        onChange={e => dateSetter(e)}
                                        timeInputLabel="Time:"
                                        showTimeInput
                                        dateFormat="dd MMMM yyyy, h:mm aa"
                                        isClearable
                                        withPortal={props.lottery ? false : true}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label className='ml-md-3' htmlFor={"input-ball1"}>1st Ball</Label>
                                <FormGroup>
                                    <Input
                                        id={"input-ball1"}
                                        name={"input-ball1"}
                                        disabled={pending}
                                        placeholder="e.g 1"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pr-md-3">
                                <Label className='ml-md-3' htmlFor={"input-ball2"}>2nd Ball</Label>
                                <FormGroup >
                                    <Input
                                        id={"input-ball2"}
                                        name={"input-ball2"}
                                        disabled={pending}
                                        placeholder="e.g 2"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-3" >
                                <Label className='ml-md-3' htmlFor={"input-ball3"}>3rd Ball</Label>
                                <FormGroup>
                                    <Input
                                        id={"input-ball3"}
                                        name={"input-ball3"}
                                        disabled={pending}
                                        placeholder="e.g 3"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pr-md-3" >
                                <Label className='ml-md-3' htmlFor={"input-ball4"}>4th Ball</Label>
                                <FormGroup>
                                    <Input
                                        id={"input-ball4"}
                                        name={"input-ball4"}
                                        disabled={pending}
                                        placeholder="e.g 4"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-3">
                                <Label className='ml-md-3' htmlFor={"input-ball5"}>5th Ball</Label>
                                <FormGroup>
                                    <Input
                                        id={"input-ball5"}
                                        name={"input-ball5"}
                                        disabled={pending}
                                        placeholder="e.g 5"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pr-md-3">
                                <Label className='ml-md-3' htmlFor={"input-ball6"}>6th Ball</Label>
                                <FormGroup>
                                    <Input
                                        id={"input-ball6"}
                                        name={"input-ball6"}
                                        disabled={pending}
                                        placeholder="e.g 6"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-3">
                                <Label className='ml-md-3' htmlFor={"input-ball7"}>Bonus Ball</Label>
                                <FormGroup>
                                    <Input
                                        id={"input-ball7"}
                                        name={"input-ball7"}
                                        disabled={pending}
                                        placeholder="e.g 7"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pr-md-3">
                                <Label className='ml-md-3' htmlFor={"input-ball8"}>Bonus Ball</Label>
                                <FormGroup>
                                    <Input
                                        id={"input-ball8"}
                                        name={"input-ball8"}
                                        disabled={pending}
                                        placeholder="e.g 8"
                                        type="number"
                                        min="1" max="50"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="ml-md-1">
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            id={"input-pending"}
                                            name={"input-pending"}
                                            type="checkbox"
                                            onChange={(e) => myFunction(e)} />
                                        {' '} Result Pending
                                    <span className="form-check-sign">
                                            <span className="check" />
                                        </span>
                                    </Label>

                                </FormGroup>
                            </Col>
                        </Row>
                    </form>
                </CardBody>
                <CardFooter className='text-center'>
                    <Button
                        className="btn-fill"
                        color="primary"
                        type="button"
                        onClick={(event) => {
                            event.preventDefault();
                            if (validate()) {
                                enterData()
                            }
                        }}
                    >
                        {'Save'}
                    </Button>
                </CardFooter>
            </Card>
        </>
    )

}

export default React.memo(LotteryBallsComponent);