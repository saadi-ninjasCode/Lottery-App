function timeDifference(date) {
    let timeLeft = null
    if (date) {
        const difference = date - new Date()
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / (1000)) % 60)
            }
        }
    }
    return timeLeft
}

export { timeDifference }