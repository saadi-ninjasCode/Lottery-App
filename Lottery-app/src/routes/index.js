import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { SideBar } from '../components'
import { useSafeArea } from 'react-native-safe-area-context'
import navigationService from './navigationService'
import { Main, Contact, Privacy, Notification, Setting, Generator, Profile, FavouriteBall, Lottery } from '../screen'
import { drawerContentOptions, drawerStyle, ScreenAnimation, ScreenHeader, menuButton } from './navigationOptions'

const Stack = createStackNavigator()
const MainStack = createStackNavigator()
const SideDrawer = createDrawerNavigator()

function Drawer() {
    const inset = useSafeArea()
    return (
        <SideDrawer.Navigator
            drawerStyle={drawerStyle(inset)}
            drawerContentOptions={drawerContentOptions()}
            drawerContent={props => <SideBar {...props} />}>
            <SideDrawer.Screen name='Menu' component={MenuStack} />
        </SideDrawer.Navigator>
    )
}

function MenuStack() {
    return (
        <Stack.Navigator initialRouteName='Main' screenOptions={ScreenAnimation(), ScreenHeader()}>
            <Stack.Screen name='Main' component={Main} options={menuButton()} />
            <Stack.Screen name='Contact' component={Contact} />
            <Stack.Screen name='Privacy' component={Privacy} />
            <Stack.Screen name='Notification' component={Notification} />
            <Stack.Screen name='Setting' component={Setting} />
            <Stack.Screen name='Generator' component={Generator} />
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='Favourite' component={FavouriteBall} />
            <Stack.Screen name='Lottery' component={Lottery} />
        </Stack.Navigator>
    )
}

function AppContainer() {
    return (
        <NavigationContainer
            ref={ref => navigationService.setGlobalRef(ref)}>
            <MainStack.Navigator headerMode='none' initialRouteName='Drawer'>
                <MainStack.Screen name='Drawer' component={Drawer} />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default AppContainer;
