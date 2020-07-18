
import React, { useState, useRef } from 'react'
import { Row, Col, Input, Button, ModalFooter, ModalBody, FormGroup, UncontrolledAlert } from 'reactstrap'
import { validateFunc } from 'constraint/constraint'
import { changePassword } from '../../apollo/server'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const CHANGE_PASSWORD = gql`${changePassword}`

function ChangePassword(props) {
    const formRef = useRef()
    const [oldPasswordError, oldPasswordErrorSetter] = useState(null)
    const [newPasswordError, newPasswordErrorSetter] = useState(null)
    const [message, messageSetter] = useState('')
    const [mainError, mainErrorSetter] = useState('')
    const [mutation, { loading }] = useMutation(CHANGE_PASSWORD, { onCompleted, onError })

    function onCompleted() {
        mainErrorSetter('')
        messageSetter('Change Password Successfully!')
    }
    function onError(QueryError) {
        console.log(QueryError)
        let errorMesage = ''
        try {
            if (QueryError.graphQLErrors.length > 0)
                errorMesage = QueryError.graphQLErrors[0].message
            else if (QueryError.networkError)
                errorMesage = QueryError.networkError.result.errors[0].message
        } catch (err) {
            errorMesage = 'Something went wrong.'
        }
        mainErrorSetter(errorMesage)
        messageSetter('')
    }

    function validation() {
        const oldPassword = !validateFunc({ password: formRef.current['input-newPassword'].value }, 'password')
        const newPassword = !validateFunc({ password: formRef.current['input-newPassword'].value }, 'password')
        oldPasswordErrorSetter(oldPassword)
        newPasswordErrorSetter(newPassword)

        return oldPassword && newPassword
    }

    function onBlur(setter, field, state) {
        setter(!validateFunc({ [field]: state }, field))
    }

    return (
        <>
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.toggleModalSearch}>
                    <i className="fas fa-times" style={{ color: 'white' }}></i>
                </button>
                <h5 className="modal-title">Change Password</h5>
            </div>
            <ModalBody className="p-4">
                {message && (
                    <UncontrolledAlert color="success" fade={true}>
                        <span className="alert-inner--text">
                            {message}
                        </span>
                    </UncontrolledAlert>
                )}
                {mainError && (
                    <UncontrolledAlert color="danger" fade={true}>
                        <span className="alert-inner--text">
                            {mainError}
                        </span>
                    </UncontrolledAlert>
                )}
                <form ref={formRef}>
                    <Row>
                        <Col className="pr-md-3" md="12">
                            <label
                                className="form-control-label"
                                htmlFor="input-oldPassword">
                                {'Old Password'}
                            </label>
                            <FormGroup className={oldPasswordError === null ? '' : oldPasswordError ? 'has-success' : 'has-danger'}>
                                <Input
                                    id="input-oldPassword"
                                    name='input-oldPassword'
                                    placeholder="*****"
                                    type="password"
                                    onBlur={event => {
                                        onBlur(oldPasswordErrorSetter, 'password', event.target.value)
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-md-3" md="12">
                            <label
                                className="form-control-label"
                                htmlFor="input-oldPassword">
                                {'New Password'}
                            </label>
                            <FormGroup className={newPasswordError === null ? '' : newPasswordError ? 'has-success' : 'has-danger'}>
                                <Input
                                    id="input-newPassword"
                                    name='input-newPassword'
                                    placeholder="*****"
                                    type="password"
                                    onBlur={event => {
                                        onBlur(newPasswordErrorSetter, 'password', event.target.value)
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggleModalSearch}>
                    {'Close'}
                </Button>
                <Button
                    color="primary"
                    className="btn-fill"
                    type="button"
                    size='md'
                    onClick={event => {
                        event.preventDefault();
                        if (validation())
                            mutation({
                                variables: {
                                    oldPassword: formRef.current['input-oldPassword'].value,
                                    newPassword: formRef.current['input-newPassword'].value
                                }
                            })
                    }}
                >
                    {loading ? <i className='fas fa-compact-disc fa-spin fa-2x fa-fw' /> :
                        'Save changes'
                    }

                </Button>
            </ModalFooter>
        </>
    )
}

export default React.memo(ChangePassword);