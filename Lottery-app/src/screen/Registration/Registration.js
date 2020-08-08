import React, { useLayoutEffect, useState } from 'react'
import styles from './styles'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { colors, scale } from '../../utilities'
import screenOptions from './screenOptions'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RectButton } from 'react-native-gesture-handler'
import Animated, { Easing } from 'react-native-reanimated'
import { TextDefault, Login, SignUp, HeadingLine, Spinner } from '../../components'
import { FontAwesome } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth'
import * as Facebook from 'expo-facebook'
import getEnvVars from '../../../environment'

const {
    IOS_CLIENT_ID_GOOGLE,
    ANDROID_CLIENT_ID_GOOGLE,
    FACEBOOK_APP_ID
} = getEnvVars()

function Registration() {
    const navigation = useNavigation()
    const [isOn, isOnSetter] = useState(false)
    const [loading, setLoading] = useState(false)
    const [textLogin, textLoginSetter] = useState(true)
    const [loginButton, loginButtonSetter] = useState(null)
    const [offset, offsetSetter] = useState(new Animated.Value(0));

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
        textLoginSetter(prev => !prev)
        setTimeout(toggleText, 300)
    }
    const toggleText = () => {
        isOnSetter(prev => !prev);
    }
    async function _googleSignup() {
        const { type, user } = await Google.logInAsync({
            iosClientId: IOS_CLIENT_ID_GOOGLE,
            androidClientId: ANDROID_CLIENT_ID_GOOGLE,
            iosStandaloneAppClientId: IOS_CLIENT_ID_GOOGLE,
            androidStandaloneAppClientId: ANDROID_CLIENT_ID_GOOGLE,
            redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`,
            scopes: ["profile", "email"]
        })
        if (type === 'success') {
            console.log(user)
            return user
        }
    }
    async function _facebookSignup() {
        await Facebook.initializeAsync(FACEBOOK_APP_ID)
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            FACEBOOK_APP_ID,
            {
                permissions: ['public_profile', 'email']
            }
        )
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name`);
            const user = await response.json()
            console.log(token, user)
            return user
        }
    }

    function SwitchButton() {
        return (
            <View style={styles.switchContainer}>
                <RectButton
                    style={styles.createToggleSwitchStyle}
                    onPress={() => toggle()}
                >
                    <TextDefault textColor={colors.fontSecondColor}>{'Login'}</TextDefault>
                    <TextDefault textColor={colors.fontSecondColor}>{'Sign Up'}</TextDefault>
                </RectButton>
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
                    <View style={[styles.flex, { justifyContent: 'space-between' }]}>
                        {!isOn ?
                            <Login loadingIcon={loading && loginButton === 'Login'}
                                onPress={() => {
                                    loginButtonSetter('Login')
                                }}
                            />
                            :
                            <SignUp loadingIcon={loading && loginButton === 'SignUp'}
                                onPress={() => {
                                    loginButtonSetter('SignUp')
                                }}
                            />
                        }
                    </View>
                    <View>
                        <HeadingLine headerName="Or" textWidth="20%" lineWidth="40%" />
                        <RectButton style={[styles.socialBtn, styles.googleButton]}
                            onPress={async () => {
                                if (!loading) {
                                    loginButtonSetter('Google')
                                    const googleUser = await _googleSignup()

                                }
                            }}
                        >
                            {(loading && loginButton === 'Google') ?
                                <Spinner backColor="rgba(0,0,0,0.1)" spinnerColor={colors.white} />
                                : (
                                    <>
                                        <View style={styles.btnLogo}>
                                            <FontAwesome name="google" size={scale(20)} color={colors.google} />
                                        </View>
                                        <View style={styles.btnText}>
                                            <TextDefault textColor={colors.white} H5>{'Sign in with Google'}</TextDefault>
                                        </View>
                                    </>
                                )}
                        </RectButton>
                        <RectButton style={[styles.socialBtn, styles.facebookButton]}
                            onPress={async () => {
                                if (!loading) {
                                    loginButtonSetter('Facebook')
                                    const facebookUser = await _facebookSignup()
                                }
                            }}>
                            {(loading && loginButton === 'Facebook') ?
                                <Spinner backColor="rgba(0,0,0,0.1)" spinnerColor={colors.white} />
                                : (
                                    <>
                                        <View style={styles.btnLogo}>
                                            <FontAwesome name="facebook" size={scale(20)} color={colors.facebook} />
                                        </View>
                                        <View style={styles.btnText}>
                                            <TextDefault textColor={colors.white} H5>{'Sign in with Facebook'}</TextDefault>
                                        </View>
                                    </>
                                )}
                        </RectButton>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Registration