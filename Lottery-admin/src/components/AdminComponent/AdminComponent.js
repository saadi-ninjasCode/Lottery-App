import React, { useState, useRef, useEffect } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Row,
    Col,
    InputGroupAddon,
    InputGroup,
    InputGroupText
} from "reactstrap";
import classNames from 'classnames'
import { validateFunc } from "../../constraint/constraint";
import { adminUsers, createAdminUser } from '../../apollo/server'
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const ADMIN_USERS = gql`${adminUsers}`
const CREATE_ADMIN_USER = gql`${createAdminUser}`

function AdminComponent(props) {
    const form = useRef()
    const [nameFocus, nameFocusSetter] = useState(false)
    const [emailFocus, emailFocusSetter] = useState(false)
    const [passFocus, passFocusSetter] = useState(false)
    const [nameError, nameErrorSetter] = useState(null)
    const [emailError, emailErrorSetter] = useState(null)
    const [passwordError, passwordErrorSetter] = useState(null)
    const [mutation, { loading }] = useMutation(CREATE_ADMIN_USER, { onCompleted, onError, refetchQueries: [{ query: ADMIN_USERS }] })
    function clearFields() {
        nameErrorSetter(null)
        emailErrorSetter(null)
        passwordErrorSetter(null)
    }
    function onCompleted(data) {
        console.log(data)
        showMessage('Admin User Added', 'success')
        clearFields()
    }
    function onError(QueryError) {
        console.log(QueryError)
        clearFields()
        let errorMesage = ''
        try {
            if (QueryError.graphQLErrors.length > 0)
                errorMesage = QueryError.graphQLErrors[0].message
            else if (QueryError.networkError)
                errorMesage = QueryError.networkError.result.errors[0].message
        } catch (err) {
            errorMesage = 'Something went wrong.'
        }
        showMessage(errorMesage, 'danger')
    }
    function showMessage(message, category) {
        props.notification(message, category)
    }
    function onBlur(setter, field, state) {
        setter(!validateFunc({ [field]: state }, field))
    }
    function validate() {
        const nameError = !validateFunc({ name: form.current['input-name'].value }, 'name')
        const emailError = !validateFunc({ email: form.current['input-email'].value }, 'email')
        const passwordError = !validateFunc({ password: form.current['input-password'].value }, 'password')
        nameErrorSetter(nameError)
        emailErrorSetter(emailError)
        passwordErrorSetter(passwordError)
        return nameError && emailError && passwordError
    }

    console.log('AdminComponent')
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <form ref={form}>
                            <CardHeader>
                                <h5 className="h3"> Add New Admin User</h5>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col className="pr-md-3" md="12">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-name">
                                            User Name
                                    </label>
                                        <InputGroup className={classNames(
                                            nameError === null ? '' : nameError ? 'has-success' : 'has-danger',
                                            { "input-group-focus": nameFocus })
                                        }>
                                            <InputGroupAddon addonType="prepend" >
                                                <InputGroupText><i className="fas fa-user fa-fw"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id="nput-name"
                                                name='input-name'
                                                placeholder="e.g John"
                                                type="text"
                                                onFocus={e => nameFocusSetter(true)}
                                                onBlur={event => {
                                                    onBlur(nameErrorSetter, 'name', event.target.value)
                                                    nameFocusSetter(false)
                                                }}
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-md-3" md="12">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-email">
                                            Email
                                    </label>
                                        <InputGroup className={classNames(
                                            emailError === null ? '' : emailError ? 'has-success' : 'has-danger',
                                            { "input-group-focus": emailFocus })
                                        }>
                                            <InputGroupAddon addonType="prepend" >
                                                <InputGroupText><i className="fas fa-envelope fa-fw"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id="nput-emal"
                                                name='input-email'
                                                placeholder="abc@123.com"
                                                type="email"
                                                onFocus={e => emailFocusSetter(true)}
                                                onBlur={event => {
                                                    onBlur(emailErrorSetter, 'email', event.target.value)
                                                    emailFocusSetter(false)
                                                }}
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="pr-md-3" md="12">
                                        <label className="form-control-label" htmlFor="input-password"> Password</label>
                                        <InputGroup className={classNames(
                                            passwordError === null ? '' : passwordError ? 'has-success' : 'has-danger',
                                            { "input-group-focus": passFocus })
                                        }>
                                            <InputGroupAddon addonType="prepend" >
                                                <InputGroupText><i className="fas fa-lock fa-fw"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id="input-password"
                                                name='input-password'
                                                type="password"
                                                placeholder="*******"
                                                onFocus={e => passFocusSetter(true)}
                                                onBlur={event => {
                                                    onBlur(passwordErrorSetter, 'password', event.target.value)
                                                    passFocusSetter(false)
                                                }}
                                            />

                                        </InputGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter className='text-center'>
                                <Button
                                    className="btn-fill"
                                    color="primary"
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (validate() && !loading)
                                            mutation({
                                                variables: {
                                                    userInput: {
                                                        name: form.current['input-name'].value,
                                                        email: form.current['input-email'].value,
                                                        password: form.current['input-password'].value
                                                    }
                                                }
                                            })
                                    }}
                                >
                                    {loading ? <i className='fas fa-compact-disc fa-spin fa-2x fa-fw' /> :
                                        'Save'
                                    }

                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </Col>
            </Row >
        </>
    )

}

export default React.memo(AdminComponent)