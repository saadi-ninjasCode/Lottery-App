/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import APP from './App'
import ApolloClient, { InMemoryCache, } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { server_url } from './config/config'

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";


const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: `${server_url}graphql`,
  // link,
  cache,
  request: (operation) => {
    const token = localStorage.getItem('login-token') || null
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <APP />
  </ApolloProvider>,
  document.getElementById("root")
);
