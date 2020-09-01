import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
import styles from './styles'
import { View, Platform, KeyboardAvoidingView, Keyboard } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors, scale } from '../../utilities'
import screenOptions from './screenOptions'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import Animated, { Easing } from 'react-native-reanimated'
import { TextDefault, Login, SignUp, HeadingLine, Spinner } from '../../components'
import { FontAwesome } from '@expo/vector-icons';
import { useRegistration } from '../../Hooks'

function Registration() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const navigation = useNavigation()
    const [clickBtn, clickBtnSetter] = useState(false)
    const [isOn, isOnSetter] = useState(false)
    const [textLogin, textLoginSetter] = useState(true)
    const [offset, offsetSetter] = useState(new Animated.Value(0));
    const [margin, marginSetter] = useState(false)


    const { getPermission, getLogin, _facebookSignup, _googleSignup, _signUp, loading, setLoading, loginButton, loginButtonSetter } = useRegistration()


    useLayoutEffect(() => {
        navigation.setOptions(
            screenOptions({
                iconColor: colors.headerText,
                backColor: colors.drawerColor,
            })
        )
    }, [navigation])

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    function _keyboardDidShow() {
        marginSetter(true)
    }
    function _keyboardDidHide() {
        marginSetter(false)
    }

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
    async function tokenPermission() {
        setLoading(true)
        await getPermission()
    }
    async function mutateLogin(user) {
        await tokenPermission()
        await getLogin(user)
    }
    async function mutateSignUp(user) {
        await tokenPermission()
        await _signUp(user)
    }

    function SwitchButton() {
        return (
            <View style={styles.switchContainer}>
                <RectButton
                    rippleColor={colors.activeColor}
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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={styles.flex}>
                <ScrollView
                    style={styles.flex}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: margin ? 20 : 0 }}>
                    <View style={styles.container}>
                        {SwitchButton()}
                        <View style={[styles.inputContainer, styles.flex]}>
                            {!isOn ?
                                <Login
                                    ref={{ emailRef, passwordRef }}
                                    loadingIcon={loading && loginButton === 'Login'}
                                    onPress={async () => {
                                        if (!loading) {
                                            loginButtonSetter('Login')
                                            const user = {
                                                email: emailRef.current.value(),
                                                password: passwordRef.current.value(),
                                                type: 'default'
                                            }
                                            await mutateLogin(user)
                                        }
                                    }}
                                />
                                :
                                <SignUp
                                    ref={{ emailRef, passwordRef, nameRef }}
                                    loadingIcon={loading && loginButton === 'SignUp'}
                                    onPress={async () => {
                                        if (!loading) {
                                            loginButtonSetter('SignUp')
                                            const user = {
                                                email: emailRef.current.value(),
                                                password: passwordRef.current.value(),
                                                name: nameRef.current.value()
                                            }
                                            await mutateSignUp(user)
                                        }
                                    }}
                                />
                            }
                            <View>
                                <HeadingLine headerName="Or" textWidth="20%" lineWidth="40%" />
                                <RectButton style={[styles.socialBtn, styles.googleButton]}
                                    rippleColor={colors.fontMainColor}
                                    onPress={async () => {
                                        if (!loading && !clickBtn) {
                                            clickBtnSetter(true)
                                            loginButtonSetter('Google')
                                            const googleUser = await _googleSignup()
                                            if (googleUser) {
                                                const user = {
                                                    email: googleUser.email,
                                                    password: '',
                                                    name: googleUser.name,
                                                    type: 'google'
                                                }
                                                await mutateLogin(user)
                                            }
                                            clickBtnSetter(false)
                                        }
                                    }}
                                >
                                    {(loading && loginButton === 'Google') ?
                                        <Spinner backColor="transparent" spinnerColor={colors.white} />
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
                                    rippleColor={colors.fontMainColor}
                                    onPress={async () => {
                                        if (!loading && !clickBtn) {
                                            clickBtnSetter(true)
                                            loginButtonSetter('Facebook')
                                            const facebookUser = await _facebookSignup()
                                            if (facebookUser) {
                                                const user = {
                                                    facebookId: facebookUser.id,
                                                    email: facebookUser.email,
                                                    password: '',
                                                    name: facebookUser.name,
                                                    type: 'facebook'
                                                }
                                                await mutateLogin(user)
                                            }
                                            clickBtnSetter(false)
                                        }
                                    }}>
                                    {(loading && loginButton === 'Facebook') ?
                                        <Spinner backColor="transparent" spinnerColor={colors.white} />
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
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default Registration