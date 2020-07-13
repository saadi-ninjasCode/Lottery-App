
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
import React, { useEffect, useState, useRef } from "react";
import { timeDifference } from "utils/time";
import './countDown.css'
import { Row, Col } from "reactstrap";

function CountDown(props) {
    let timer = useRef()
    const next_draw = props.time ?? null
    const [timeLeft, setTimeLeft] = useState(timeDifference(next_draw));
    const timeZone = /\((.*)\)/.exec(new Date())[1]
    useEffect(() => {
        if (timeLeft != null) {
            const id = setInterval(() => {
                setTimeLeft(timeDifference(next_draw))
            }, 1000)
            timer.current = id
        }
        return () => clearInterval(timer.current)
    }, [next_draw])
    if (!timeLeft) {
        clearInterval(timer.current)
        return (
            <h3 className='text-center' > Result Announced</h3>
        )
    }
    return (
        <>
            <Row>
                <Col>
                    <div className="clock">
                        <div className="time-container time-days bg-light">
                            <span className="time-value time-days-value">{timeLeft.days}</span>
                            <span className="time-label time-days-label text-white">Days</span>
                        </div>
                        <div className="time-container time-hours bg-light">
                            <span className="time-value time-hours-value">{timeLeft.hours}</span>
                            <span className="time-label time-hours-label text-white">Hours</span>
                        </div>
                        <div className="time-container time-minutes bg-light">
                            <span className="time-value time-minutes-value">{timeLeft.minutes}</span>
                            <span className="time-label time-minutes-label text-white">Minutes</span>
                        </div>
                        <div className="time-container ">
                            <span className="time-value time-seconds-value text-primary">{timeLeft.seconds}</span>
                            <span className="time-label time-seconds-label text-primary">Seconds</span>
                        </div>
                    </div>
                </Col>
            </Row>
            <p className='text-center'>{timeZone}</p>
        </>
    )
}

export default React.memo(CountDown)