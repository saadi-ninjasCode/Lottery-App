import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('login-token') ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{
                            pathname: '/auth/login',
                            state: { from: props.location }
                        }}
                        />
                    )
            }
        />
    )
}
export default PrivateRoute