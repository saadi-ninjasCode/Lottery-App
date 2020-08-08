import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppContainer from './src/routes/index'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { colors } from './src/utilities';
import getEnvVars from './environment'

const { GRAPHQL_URL } = getEnvVars()

export default function App() {
  const cache = new InMemoryCache()
  const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: cache,
  })
  return (
    <ApolloProvider client={client} >
      <AppContainer />
      <StatusBar style="light" backgroundColor={colors.drawerColor} />
    </ApolloProvider >
  );
}

