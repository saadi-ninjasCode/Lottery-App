import React from 'react'
import classNames from 'classnames'
import { useMutation } from '@apollo/react-hooks'
import { Button } from 'reactstrap'
import { adminLogin, getlottery } from '../../apollo/server'
import { gql } from 'apollo-boost'

const ADMIN_USERS = gql`${adminLogin}`
const GET_LOTTERY = gql`${getlottery}`


function ActionButton(props) {
    const mutation = props.mutation ? props.mutation : ADMIN_USERS
    const query = props.refetchQuery ? props.refetchQuery : GET_LOTTERY
    var [deleteAdmin, { loading: deleteLoader }] = useMutation(mutation, { onCompleted, onError, refetchQueries: [{ query: query, variables: { page: props.pageNumber ? props.pageNumber - 1 : 0, rows: props.rows ? props.rows : 10 } }] })
    function onCompleted(data) {
        console.log(data)
        props.showMessage(props.message, 'success')
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
        props.showMessage(errorMesage, 'danger')
    }
    console.log('Action Button')
    return (
        <>
            {props.editButton &&
                <>
                    <Button className='btn-icon btn-link remove btn btn-warning btn-sm'
                        onClick={e => {
                            e.preventDefault()
                            props.editModal(props.row)
                        }}>
                        <i className="fas fa-edit"></i>
                    </Button>
                &nbsp;&nbsp;
                </>
            }
            {
                props.deleteButton &&
                <Button className={classNames(
                    { "btn-icon": !deleteLoader },
                    "btn-link remove btn btn-danger btn-sm"
                )}
                    onClick={e => {
                        e.preventDefault()
                        if (!deleteLoader && props.mutation)
                            deleteAdmin({
                                variables: {
                                    id: props.row._id
                                }
                            })
                    }
                    }>
                    <i className={classNames(
                        "fas fa-times",
                        { "fa-spin": deleteLoader }
                    )}></i>
                </Button >
            }
        </>
    )
}
export default React.memo(ActionButton);