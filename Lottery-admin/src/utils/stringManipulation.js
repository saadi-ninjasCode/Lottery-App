
const lotteryBallsTransformation = (balls, pending) => {
    if (pending) {
        return 'Pending'
    }
    else if (balls.length > 0) {
        return balls.join(", ")
    }
    else {
        return '-'
    }
}

export { lotteryBallsTransformation }