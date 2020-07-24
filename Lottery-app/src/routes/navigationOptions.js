import React from 'react'
import { colors, scale, textStyles } from "../utilities"
import { BackButtonComponent, LeftButtonComponent } from "../components";
import { StyleSheet, View, Image } from "react-native";

const config = {
    animation: 'timing',
    config: {
        timing: 500,
    },
};

const drawerStyle = (inset) => ({
    backgroundColor: colors.drawerColor,
    paddingBottom: inset.bottom,
    paddingTop: inset.top
})

const drawerContentOptions = () => ({
    contentContainerStyle: {
        flexGrow: 1,
        paddingTop: 0
    }
})

const ScreenAnimation = () => ({
    transitionSpec: {
        open: config,
        close: config
    },
})
const menuButton = () => ({
    headerLeft: () => <LeftButtonComponent iconColor={colors.headerText} />
})

const ScreenHeader = () => ({
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    headerTitle: (props) => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image resizeMode='cover'
                style={{ width: scale(65), height: scale(65) }}
                source={require('../assets/images/headerIcon.png')} />
        </View>
    ),
    headerStyle: {
        height: scale(120),
        backgroundColor: colors.headerBackground,
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    headerTitleStyle: {
        color: colors.headerText,
        ...textStyles.H3,
        ...textStyles.Bold,
        backgroundColor: 'transparent'
    },
    headerBackImage: () => <BackButtonComponent iconColor={colors.headerText} icon='leftArrow' />,
    headerTitleContainerStyle: {
        marginHorizontal: scale(35)
    },
})

export { drawerStyle, drawerContentOptions, ScreenAnimation, ScreenHeader, menuButton }