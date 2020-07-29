import React, { useLayoutEffect, useState } from 'react'
import styles from './styles'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { colors, scale } from '../../utilities'
import screenOptions from './screenOptions'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { Easing } from 'react-native-reanimated'
import { TextDefault, Login, SignUp } from '../../components'

function Registration() {
    const navigation = useNavigation()
    const [isOn, isOnSetter] = useState(false)
    const [textLogin, textLoginSetter] = useState(true)
    const [offset, offsetSetter] = useState(new Animated.Value(0));
    const [fade, fadeSetter] = useState(new Animated.Value(0));
    useLayoutEffect(() => {
        navigation.setOptions(
            screenOptions({
                iconColor: colors.headerText,
                backColor: colors.drawerColor,
            })
        )
    }, [navigation])

    const buttonPosition = offset.interpolate({
        inputRange: [0, 1],
        outputRange: [0, scale(75)]
    });

    function animate() {
        Animated.timing(offset, {
            toValue: isOn ? 0 : 1,
            duration: 300,
            easing: Easing.ease
        }).start()
    }
    function toggle() {
        animate();
        setTimeout(toggleText, 200)
    }
    const toggleText = () => {
        textLoginSetter(prev => !prev)
        isOnSetter(prev => !prev);
    }

    function SwitchButton() {
        return (
            <View style={styles.switchContainer}>
                <TouchableOpacity
                    style={styles.createToggleSwitchStyle}
                    onPress={() => toggle()}
                >
                    <TextDefault textColor={colors.fontSecondColor}>{'Login'}</TextDefault>
                    <TextDefault textColor={colors.fontSecondColor}>{'Sign Up'}</TextDefault>
                </TouchableOpacity>
                <Animated.View style={[styles.createInsideCircleStyle, { transform: [{ translateX: buttonPosition }] }]}>
                    <TextDefault style={styles.font} textColor={colors.white} center>{textLogin ? 'Login' : 'SignUp'}</TextDefault>
                </Animated.View>
            </View>
        )
    }
    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.flex, styles.backScreen]} >
            <View style={styles.container}>
                {SwitchButton()}
                <View style={[styles.inputContainer, styles.flex]}>
                    {!isOn ?
                        <Login />
                        :
                        <SignUp />
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Registration