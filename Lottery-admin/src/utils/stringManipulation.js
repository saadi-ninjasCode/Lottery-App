import { dateWithWeekdayMoment, dateToCustomMoment } from "../variables/date"

const lotteryBallsTransformation = (balls, pending) => {
    if (pending) {
        return 'Pending'
    }
    else if (balls.length > 0) {
        const arr = balls.map(x => {
            if (!x)
                return '-'
            else
                return x
        })
        return arr.join(", ")
    }
    else {
        return '-'
    }
}

const favouriteBallTransformation = (balls) => {
    if (balls.length < 1) {
        return 'None'
    }
    else {
        const ballArr = Array(3).fill('-')
        balls.map((x, index) => (
            ballArr[index] = x.ball ? x.ball : '-'
        ))
        return ballArr.join(" , ")
    }
}

const favouriteTimeTransformation = balls => {
    if (balls.length < 1) {
        return 'None'
    }
    else {
        const timeArr = Array(3).fill('-')
        balls.map((x, index) => (
            timeArr[index] = x.times ? x.times : '-'
        ))
        return timeArr.join(" , ")
    }
}

const dateTransformation = (date, weekday = false) => {
    if (date) {
        if (weekday)
            return dateWithWeekdayMoment(date)
        else
            return dateToCustomMoment(date)
    }
    else
        return '-'
}

export { lotteryBallsTransformation, favouriteBallTransformation, favouriteTimeTransformation, dateTransformation }