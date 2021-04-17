import { ApolloProvider } from "@apollo/client";
import { setTestDeviceIDAsync } from "expo-ads-admob";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import getEnvVars from "./environment";
import setupApollo from "./src/apollo/index";
import { UserProvider } from "./src/context/User";
import AppContainer from "./src/routes/index";
import { colors } from "./src/utilities";
const { AD_MOB_BANNER, AD_MOB_INTERSTITIAL, AD_MOB_REWARDED } = getEnvVars();

moment.tz.setDefault("Europe/London");
// Set global test device ID
setTestDeviceIDAsync("EMULATOR");

export default function App() {
  const [client, setupClient] = useState(null);

  useEffect(() => {
    loadAppData();
  }, []);

  async function loadAppData() {
    const client = await setupApollo();
    setupClient(client);
    await permissionForPushNotificationsAsync();
  }

  async function permissionForPushNotificationsAsync() {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== "granted") {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
    } else {
      // Alert.alert("Note", "Must use physical device for Push Notifications");
    }
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        sound: true,
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#221977",
      });
    }
  }

  if (client) {
    return (
      <ApolloProvider client={client}>
        <UserProvider>
          <AppContainer />
        </UserProvider>
        <StatusBar style="light" backgroundColor={colors.drawerColor} />
        <FlashMessage position="top" />
      </ApolloProvider>
    );
  } else
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color={colors.greenColor} />
      </View>
    );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
