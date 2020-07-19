import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppContainer from './src/routes/index'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { colors } from './src/utilities';

export default function App() {
  const cache = new InMemoryCache()
  const client = new ApolloClient({
    uri: `http://192.168.100.9:3000/graphql`,
    cache: cache,
  })
  return (

    < ApolloProvider client={client} >
      <AppContainer />
      <StatusBar style="light" backgroundColor={colors.drawerColor} />
    </ApolloProvider >
  );
}

