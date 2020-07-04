import React, { useState, useRef } from 'react'
import classNames from "classnames";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    UncontrolledAlert
} from 'reactstrap'
import { Redirect } from 'react-router-dom'
import { validateFunc } from '../constraint/constraint'
import { adminLogin } from '../apollo/server'
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
const LOGIN = gql`${adminLogin}`

const credentials = {
    email: 'saadjaved143@yahoo.com',
    password: 'saadi143'
}
const Login = props => {
    const form = useRef()
    const [emailFocus, emailFocusSetter] = useState(false)
    const [passFocus, passFocusSetter] = useState(false)
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [error, setError] = useState(null)
    const [redirectToReferrer, setRedirectToReferrer] = useState(
        !!localStorage.getItem('login-token')
    )

    const [mutate, { data, loading }] = useMutation(LOGIN, { onCompleted, onError })

    function onError(error) {
        console.log(error)
        setEmailError(null)
        setPasswordError(null)
        if (error.graphQLErrors)
            setError(error.graphQLErrors[0].message)
    }
    function onCompleted({adminLogin}) {
        localStorage.setItem('login-token', adminLogin.token)
        setRedirectToReferrer(true)
    }

    const onBlur = (event, field) => {
        if (field === 'email') {
            setEmailError(!validateFunc({ email: form.current['email'].value }, 'email'))
        }
        if (field === 'password') {
            setPasswordError(!validateFunc({ password: form.current['password'].value }, 'password'))
        }
    }
    const validate = () => {
        const emailError = !validateFunc({ email: form.current['email'].value }, 'email')
        const passwordError = !validateFunc({ password: form.current['password'].value }, 'password')
        setEmailError(emailError)
        setPasswordError(passwordError)
        return emailError && passwordError
    }

    const { from } = props.location.state || { from: '/admin/dashboard' }
    if (redirectToReferrer) return <Redirect to={from} />
    return (
        <Col lg="5" md="7">
            <Card className="content shadow border-0">
                <CardHeader className="bg-dark pb-5">
                    <div className="text-center text-monospace ">
                        {'Sign in credentials'}
                    </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">

                    <form ref={form} >
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
                                name='email'
                                defaultValue={credentials.email}
                                onFocus={() => emailFocusSetter(true)}
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
                                name='password'
                                defaultValue={credentials.password}
                                onFocus={() => passFocusSetter(true)}
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
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (validate() && !loading) {
                                        mutate({ variables: { email: form.current['email'].value, pass: form.current['password'].value } })
                                    }
                                }}>
                                {loading ? <i className='fas fa-compact-disc fa-spin fa-2x fa-fw' /> :
                                    'Sign in'
                                }
                            </Button>
                        </div>
                        {error && (
                            <UncontrolledAlert color="danger" fade={true}>
                                <span className="alert-inner--text">{error}</span>
                            </UncontrolledAlert>
                        )}
                    </form>
                </CardBody>
            </Card>
        </Col>
    )
}

export default Login
