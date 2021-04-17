import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SideBar } from "../components";
import {
  Condition,
  FavouriteBall,
  Generator,
  Lottery,
  Main,
  Notification,
  Privacy,
  Profile,
  Registration,
} from "../screen";
import { drawerContentOptions, drawerStyle, menuButton, ScreenAnimation, ScreenHeader } from "./navigationOptions";
import navigationService from "./navigationService";

const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const SideDrawer = createDrawerNavigator();

function Drawer() {
  const inset = useSafeAreaInsets();
  return (
    <SideDrawer.Navigator
      drawerStyle={drawerStyle(inset)}
      drawerContentOptions={drawerContentOptions()}
      drawerContent={(props) => <SideBar {...props} />}
    >
      <SideDrawer.Screen name="Menu" component={MenuStack} />
    </SideDrawer.Navigator>
  );
}

function MenuStack() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ ...ScreenHeader(), ...ScreenAnimation() }}>
      <Stack.Screen name="Main" component={Main} options={menuButton()} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Condition" component={Condition} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Generator" component={Generator} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Favourite" component={FavouriteBall} />
      <Stack.Screen name="Lottery" component={Lottery} />
    </Stack.Navigator>
  );
}

function AppContainer() {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }, []);
  return (
    <NavigationContainer ref={(ref) => navigationService.setGlobalRef(ref)}>
      <MainStack.Navigator headerMode="none" initialRouteName="Drawer">
        <MainStack.Screen name="Drawer" component={Drawer} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
