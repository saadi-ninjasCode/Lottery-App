import React, { useRef, useState } from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, FormGroup, Input, Row, Col, Label } from "reactstrap";
import { editFavouriteBalls, getColdBalls } from "../..//apollo/server";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { validateFunc } from "../../constraint/constraint";

const EDIT_FAVOURITE_BALLS = gql`
  ${editFavouriteBalls}
`;
const GET_BALLS = gql`
  ${getColdBalls}
`;

function ColdBallComponent(props) {
  const formRef = useRef();

  const [lotteryError, lotteryErrorSetter] = useState(null);
  const [Ball1Error, Ball1ErrorSetter] = useState(null);
  const [Ball2Error, Ball2ErrorSetter] = useState(null);
  const [Ball3Error, Ball3ErrorSetter] = useState(null);
  const [Time1Error, Time1ErrorSetter] = useState(null);
  const [Time2Error, Time2ErrorSetter] = useState(null);
  const [Time3Error, Time3ErrorSetter] = useState(null);
  const { loading: loadingLottery, data: lotteryData, error: lotteryDataError } = useQuery(GET_BALLS);
  const [mutation, { loading }] = useMutation(EDIT_FAVOURITE_BALLS, {
    onCompleted,
    onError,
    refetchQueries: [{ query: GET_BALLS }],
  });

  const onBlur = (setter, field, state) => {
    setter(!validateFunc({ [field]: state }, field));
  };
  function validate() {
    const lotteryError = !validateFunc({ lotteryDropDown: formRef.current["input-lottery"].value }, "lotteryDropDown");
    const ball1Error = !validateFunc({ ball: formRef.current["input-ball1"].value }, "ball");
    const ball2Error = !validateFunc({ ball: formRef.current["input-ball2"].value }, "ball");
    const ball3Error = !validateFunc({ ball: formRef.current["input-ball3"].value }, "ball");
    const time1Error = !validateFunc({ ball: formRef.current["input-time1"].value }, "ball");
    const time2Error = !validateFunc({ ball: formRef.current["input-time2"].value }, "ball");
    const time3Error = !validateFunc({ ball: formRef.current["input-time3"].value }, "ball");

    lotteryErrorSetter(lotteryError);
    Ball1ErrorSetter(ball1Error);
    Ball2ErrorSetter(ball2Error);
    Ball3ErrorSetter(ball3Error);
    Time1ErrorSetter(time1Error);
    Time2ErrorSetter(time2Error);
    Time3ErrorSetter(time3Error);

    return lotteryError && ball1Error && ball2Error && ball3Error && time1Error && time2Error && time3Error;
  }

  function enterData() {
    const coldBallArray = Array(3);
    coldBallArray[0] = { ball: formRef.current["input-ball1"].value, times: formRef.current["input-time1"].value };
    coldBallArray[1] = { ball: formRef.current["input-ball2"].value, times: formRef.current["input-time2"].value };
    coldBallArray[2] = { ball: formRef.current["input-ball3"].value, times: formRef.current["input-time3"].value };
    mutation({
      variables: {
        ballsCountInput: {
          lottery: formRef.current["input-lottery"].value,
          coldBall: coldBallArray,
        },
      },
    });
  }
  function onCompleted() {
    props.showMessage("Favourite Balls Updated!", "success");
    formRef.current.reset();
    Ball1ErrorSetter(null);
    Ball2ErrorSetter(null);
    Ball3ErrorSetter(null);
    Time1ErrorSetter(null);
    Time2ErrorSetter(null);
    Time3ErrorSetter(null);
  }
  function onError(QueryError) {
    let errorMesage = "";
    try {
      if (QueryError.graphQLErrors.length > 0) errorMesage = QueryError.graphQLErrors[0].message;
      else if (QueryError.networkError) errorMesage = QueryError.networkError.result.errors[0].message;
    } catch (err) {
      errorMesage = "Something went wrong.";
    }
    props.showMessage(errorMesage, "danger");
  }
  if (lotteryDataError) return <h5>Something is missing</h5>;
  return (
    <>
      <Card>
        <form ref={formRef}>
          <CardHeader>
            <h4 className="title text-info">Cold Balls</h4>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="pr-md-3" md="12">
                <Label htmlFor={"input-lottery"} className="ml-md-3">
                  Lottery <i className="fas fa-glasses"></i>
                </Label>
                <FormGroup className={lotteryError === null ? "" : lotteryError ? "has-success" : "has-danger"}>
                  <Input
                    id={"input-lottery"}
                    name={"input-lottery"}
                    type="select"
                    // defaultValue={lotterySelect}
                    onBlur={(event) => {
                      onBlur(lotteryErrorSetter, "lotteryDropDown", event.target.value);
                    }}
                  >
                    <option value="">{loadingLottery ? "Loading..." : "Select"}</option>
                    {!loadingLottery &&
                      lotteryData.lottery.map((item, index) => (
                        <option value={item._id} key={index}>
                          {item.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <p className="text-center">1st Ball</p>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1" md="6">
                <FormGroup className={Ball1Error === null ? "" : Ball1Error ? "has-success" : "has-danger"}>
                  <Input
                    id={"input-ball1"}
                    name={"input-ball1"}
                    placeholder="Ball 1"
                    type="number"
                    min="1"
                    max="50"
                    onBlur={(event) => {
                      onBlur(Ball1ErrorSetter, "ball", event.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col className="pr-md-2" md="6">
                <FormGroup className={Time1Error === null ? "" : Time1Error ? "has-success" : "has-danger"}>
                  <Input
                    id={"input-time1"}
                    name={"input-time1"}
                    placeholder="Times"
                    type="number"
                    onBlur={(event) => {
                      onBlur(Time1ErrorSetter, "ball", event.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <p className="text-center">2nd Ball</p>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1" md="6">
                <FormGroup className={Ball2Error === null ? "" : Ball2Error ? "has-success" : "has-danger"}>
                  <Input
                    id={"input-ball2"}
                    name={"input-ball2"}
                    placeholder="Ball 2"
                    type="number"
                    min="1"
                    max="50"
                    onBlur={(event) => {
                      onBlur(Ball2ErrorSetter, "ball", event.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col className="pr-md-2" md="6">
                <FormGroup className={Time2Error === null ? "" : Time2Error ? "has-success" : "has-danger"}>
                  <Input
                    id={"input-time2"}
                    name={"input-tim21"}
                    placeholder="Times"
                    type="number"
                    onBlur={(event) => {
                      onBlur(Time2ErrorSetter, "ball", event.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <p className="text-center">3rd Ball</p>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1" md="6">
                <FormGroup className={Ball3Error === null ? "" : Ball3Error ? "has-success" : "has-danger"}>
                  <Input
                    id={"input-ball3"}
                    name={"input-ball3"}
                    placeholder="Ball 3"
                    type="number"
                    min="1"
                    max="50"
                    onBlur={(event) => {
                      onBlur(Ball3ErrorSetter, "ball", event.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col className="pr-md-2" md="6">
                <FormGroup className={Time3Error === null ? "" : Time3Error ? "has-success" : "has-danger"}>
                  <Input
                    id={"input-time3"}
                    name={"input-time3"}
                    placeholder="Times"
                    type="number"
                    onBlur={(event) => {
                      onBlur(Time3ErrorSetter, "ball", event.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <CardFooter className="text-center">
              <Button
                className="btn-fill"
                color="primary"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (validate() && !loading) {
                    enterData();
                  }
                }}
              >
                {loading ? <i className="fas fa-compact-disc fa-spin fa-2x fa-fw" /> : "Save"}
              </Button>
            </CardFooter>
          </CardBody>
        </form>
      </Card>
    </>
  );
}

export default ColdBallComponent;
