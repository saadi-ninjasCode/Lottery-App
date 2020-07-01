import { validate } from 'validate.js'

const constraints = {
    email: {
        email: true
    },
    password: {
        presence: {
            allowEmpty: false
        }
    }
}

export const validateFunc = (value, constraint) => {
    return validate(value, { [constraint]: constraints[constraint] })
}