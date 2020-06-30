import React, { useState } from 'react'
import classNames from "classnames";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    UncontrolledAlert
} from 'reactstrap'
import { Redirect } from 'react-router-dom'

const Login = props => {
    const [email, setEmail] = useState('123@gmail.com')
    const [password, setPassword] = useState('123456')
    const [emailFocus, emailFocusSetter] = useState(false)
    const [passFocus, passFocusSetter] = useState(false)
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [error, setError] = useState(null)

    const onBlur = (event, field) => {
        return null
        // if (field === 'email') {
        //     setEmailError(!validateFunc({ email: email }, 'email'))
        // }
        // if (field === 'password') {
        //     setPasswordError(!validateFunc({ password: password }, 'password'))
        // }
    }
    const validate = () => {
        return null
        // const EmailError = !validateFunc({ email: email }, 'email')
        // const PasswordError = !validateFunc({ password: password }, 'password')
        // setEmailError(EmailError)
        // setPasswordError(PasswordError)
        // return EmailError && PasswordError
    }

    const { t } = props
    return (
        <>
            <Col lg="5" md="7">
                <Card className="content shadow border-0">
                    <CardHeader className="bg-dark pb-5">
                        <div className="text-center text-monospace ">
                            {'Sign in credentials'}
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">

                        <Form >
                            <InputGroup
                                className={classNames(
                                    emailError === null ? '' : emailError ? 'has-success' : 'has-danger',
                                    { "input-group-focus": emailFocus })
                                }>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-envelope" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    value={email}
                                    onFocus={() => emailFocusSetter(true)}
                                    onChange={event => {
                                        setEmail(event.target.value)
                                    }}
                                    onBlur={event => {
                                        emailFocusSetter(false)
                                        onBlur(event, 'email')
                                    }}
                                    placeholder="Email"
                                    type="email"
                                />
                            </InputGroup>
                            <InputGroup
                                className={classNames(
                                    passwordError === null ? '' : passwordError ? 'has-success' : 'has-danger',
                                    { "input-group-focus": passFocus }
                                )}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-unlock-alt" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    value={password}
                                    onFocus={() => passFocusSetter(true)}
                                    onChange={event => {
                                        setPassword(event.target.value)
                                    }}
                                    onBlur={event => {
                                        passFocusSetter(false)
                                        onBlur(event, 'password')
                                    }}
                                    placeholder="Password"
                                    type="password"
                                />
                            </InputGroup>

                            <div className="text-center">
                                <Button
                                    className="my-4"
                                    color="primary"
                                    type="button"
                                    onClick={() => {
                                        setEmailError(null)
                                        setPasswordError(null)
                                        //   if (validate()) {
                                        //     adminLogin({ variables: { password, email } })
                                        //   }
                                    }}>
                                    {'Sign in'}
                                </Button>
                            </div>
                            {error && (
                                <UncontrolledAlert color="danger" fade={true}>
                                    <span className="alert-inner--text">{error}</span>
                                </UncontrolledAlert>
                            )}
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}

export default Login
