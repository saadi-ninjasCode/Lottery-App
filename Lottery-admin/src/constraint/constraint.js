import { validate } from 'validate.js'

const constraints = {
    email: {
        email: true,
        presence: {
            allowEmpty: false
        }
    },
    password: {
        presence: {
            allowEmpty: false
        }
    },
    name: {
        presence: {
            allowEmpty: false
        }
    },
    iconName: {
        presence: {
            allowEmpty: true
        }
    },
    nextDraw: {
        datetime: true
    },
    lotteryDropDown: {
        presence: {
            allowEmpty: false
        }
    },
    ball: {
        presence: {
            allowEmpty: false
        }
    }
}

export const validateFunc = (value, constraint) => {
    return validate(value, { [constraint]: constraints[constraint] })
}