import { validate } from 'validate.js'

const constraints = {
    email: {
        email: true
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
            allowEmpty: false
        }
    },
    nextDraw: {
        datetie: true
    }
}

export const validateFunc = (value, constraint) => {
    return validate(value, { [constraint]: constraints[constraint] })
}