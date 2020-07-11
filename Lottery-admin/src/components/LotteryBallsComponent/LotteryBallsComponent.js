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
import { getlottery, createLotteryBalls, getlotteryDetails, editLotteryBalls } from "../../apollo/server"
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateFunc } from "constraint/constraint";
import NotificationAlert from "react-notification-alert";


const GET_LOTTERY = gql`${getlottery}`
const CREATE_DRAW = gql`${createLotteryBalls}`
const EDIT_DRAW = gql`${editLotteryBalls}`
const GET_LOTTERY_DETAILS = gql`${getlotteryDetails}`

function LotteryBallsComponent(props) {
    const formRef = useRef()
    const notifyEl = useRef(null);
    const [date, dateSetter] = useState(props.draw ? new Date(+props.draw.date) : new Date())
    const [pending, pendingSetter] = useState(props.draw ? props.draw.pending : false)
    const lotterySelect = props.draw ? props.draw.lottery._id : ''
    const MUTATION = props.draw ? EDIT_DRAW : CREATE_DRAW
    //Apollo
    const { loading: loadingLottery, data: lotteryData, error: lotteryDataError } = useQuery(GET_LOTTERY)
    const [mutation, { loading }] = useMutation(MUTATION, { onCompleted, onError, refetchQueries: [{ query: GET_LOTTERY_DETAILS }] })
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
            showMessage(" Invalid Data. Tick the 'Pending' or enter at-least 6 numbers", "danger")
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
            specialBall.push(formRef.current['input-ball7'].value)
            specialBall.push(formRef.current['input-ball8'].value)
            mutation({
                variables: {
                    lotteryInput: {
                        _id: props.draw ? props.draw._id : '',
                        lottery: lotteryName,
                        date: date,
                        balls: ballArray,
                        specialBalls: specialBall,
                        pending: pending
                    }
                }
            })
        } else {
            mutation({
                variables: {
                    lotteryInput: {
                        _id: props.draw ? props.draw._id : '',
                        lottery: lotteryName,
                        date: date,
                        pending: pending
                    }
                }
            })
        }
    }
    function showMessage(message, category) {
        notifyEl.current.notificationAlert(options(message, category));
    }

    function onCompleted() {
        showMessage('Lottery Type Added', 'success')
        lotteryErrorSetter(null)
    }
    function onError(QueryError) {
        console.log(QueryError)
        lotteryErrorSetter(null)
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
    return (
        <>
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notifyEl} />
            </div>
            <Row>
                <Col>
                    <Card>
                        <form ref={formRef}>
                            <CardHeader>
                                <h5 className="title">
                                    {props.draw ? 'Edit' : 'Add New'}
                                    {' Lottery Numbers'}
                                </h5>
                            </CardHeader>
                            <CardBody>
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
                                                defaultValue={lotterySelect}
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
                                                maxDate={new Date()}
                                                onChange={e => dateSetter(e)}
                                                timeInputLabel="Time:"
                                                showTimeInput
                                                dateFormat="dd MMMM yyyy, h:mm aa"
                                                isClearable
                                                withPortal={props.draw ? false : true}
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
                                                defaultValue={props.draw ? props.draw.pending ? '' : props.draw.balls[0] : ''}
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
                                                defaultValue={props.draw ? props.draw.pending ? '' : props.draw.balls[1] : ''}
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
                                                defaultValue={props.draw ? props.draw.pending ? '' : props.draw.balls[2] : ''}
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
                                                defaultValue={props.draw ? props.draw.pending ? '' : props.draw.balls[3] : ''}
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
                                                defaultValue={props.draw ? props.draw.pending ? '' : props.draw.balls[4] : ''}
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
                                                defaultValue={props.draw ? props.draw.pending ? '' : props.draw.balls[5] : ''}
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
                                                defaultValue={props.draw ? props.draw.pending ? '' : props.draw.specialBalls[0] : ''}
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
                                                defaultValue={props.draw ? props.draw.pending ? '' : props.draw.specialBalls[1] : ''}
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
                                                    defaultChecked={pending}
                                                    onChange={(e) => myFunction(e)} />
                                                {' '} {'Result Pending'}
                                                <span className="form-check-sign">
                                                    <span className="check" />
                                                </span>
                                            </Label>

                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter className='text-center'>
                                <Button
                                    className="btn-fill"
                                    color="primary"
                                    type="button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        if (validate() && !loading) {
                                            enterData()
                                        }
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

export default React.memo(LotteryBallsComponent);