import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
// reactstrap components
import { Container, Row } from 'reactstrap'

// core components
import AuthNavbar from 'components/Navbars/AuthNavbar.js'
// import AuthFooter from 'components/Footers/AuthFooter.jsx'

import routes from 'routes.js'

function Auth(props) {
  useEffect(() => {
    document.body.classList.add('bg-default')
    return () => {
      document.body.classList.remove('bg-default')
    }
  }, [])
  function getRoutes(routes) {
    return routes.map((prop, key) => {
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }
  return (
    <>
      <div className="wrapper">
        <AuthNavbar
          outterLink="https://www.49sresult.co.uk/"
          text="49s Results" />
        {/* Page content */}
        <Container className="mt-5" >
          <Row className="justify-content-center">
            <Switch>{getRoutes(routes)}</Switch>
          </Row>
        </Container>
      </div>
      {/* <AuthFooter /> */}
    </>
  )
}

export default Auth
