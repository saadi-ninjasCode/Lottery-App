import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import AppContainer from './src/routes/index'
import { ApolloProvider } from '@apollo/client'
import { colors } from './src/utilities';
import FlashMessage from 'react-native-flash-message';
import { UserProvider } from './src/context/User';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import setupApollo from './src/apollo/index'
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo';

export default function App() {
  const [client, setupClient] = useState(null)

  useEffect(() => {
    loadAppData()
  }, [])

  async function loadAppData() {
    const client = await setupApollo()
    setupClient(client)
    await permissionForPushNotificationsAsync()
  }

  async function permissionForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = existingStatus
    if (finalStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return
    }
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250]
      })
    }
  }

  if (client) {
    return (
      <ApolloProvider client={client} >
        <UserProvider>
          <AppContainer />
        </UserProvider>
        <StatusBar style="light" backgroundColor={colors.drawerColor} />
        <FlashMessage position="top" />
      </ApolloProvider >
    );
  } else return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color={colors.greenColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

