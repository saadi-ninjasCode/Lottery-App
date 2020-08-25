import { AsyncStorage } from 'react-native'
import { ApolloClient, HttpLink } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache';
import { setContext } from '@apollo/client/link/context'
import getEnvVars from '../../environment'

const { GRAPHQL_URL } = getEnvVars()

const cache = new InMemoryCache({})

const link = new HttpLink({
  uri: GRAPHQL_URL
})
const authContext = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token")
  return ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  })
})

const setupApollo = async () => {
  const client = new ApolloClient({
    cache: cache,
    link: authContext.concat(link)
  })

  // set ref for global use
  // eslint-disable-next-line no-undef
  clientRef = client

  return client
}

export default setupApollo
