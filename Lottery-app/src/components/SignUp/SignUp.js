import React, { useState } from 'react'
import { View } from 'react-native'
import styles from './styles'
import { OutlinedTextField } from 'react-native-material-textfield'
import { colors, scale, alignment } from '../../utilities'
import { TextDefault } from '../Text'
import { SimpleLineIcons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler'
import Spinner from '../Spinner/Spinner'

const SignUp = React.forwardRef((props, ref) => {
    const { emailRef, passwordRef, nameRef } = ref
    const [nameError, nameErrorSetter] = useState('')
    const [emailError, emailErrorSetter] = useState('')
    const [passwordError, passwordErrorSetter] = useState('')

    const emailValidate = () => {
        let result = true
        emailErrorSetter(null)
        const email = emailRef.current.value()
        if (!email) {
            emailErrorSetter('Email/Phone is required')
            result = false
        } else {
            const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
            const phoneRegex = /^[+]\d{6,15}$/
            if (emailRegex.test(email) !== true && phoneRegex.test(email) !== true) {
                emailErrorSetter('Invalid Email')
                result = false
            }
        }
        return result
    }
    function validate() {
        let result = true
        result = emailValidate()
        passwordErrorSetter(null)
        const name = nameRef.current.value()
        const nameRegex = /^[A-Za-z]{1,15}$/
        if (!nameRegex.test(name)) {
            nameErrorSetter('Name is required')
            result = false
        }
        const password = passwordRef.current.value()
        if (!password) {
            passwordErrorSetter('Password is required')
            result = false
        }
        return result
    }
    return (
        <View style={{ justifyContent: "space-evenly", flex: 1 }}>
            <View style={styles.rowStyle}>
                <View style={styles.w10}>
                    <SimpleLineIcons name="user-follow" size={scale(20)} color="black" />
                </View>
                <View style={styles.w90}>
                    <OutlinedTextField
                        ref={nameRef}
                        error={nameError}
                        label={'Name'}
                        labelFontSize={scale(8)}
                        fontSize={scale(12)}
                        maxLength={100}
                        textColor={colors.fontMainColor}
                        baseColor={colors.fontSecondColor}
                        errorColor={colors.textErrorColor}
                        tintColor={!emailError ? colors.activeColor : 'red'}
                        labelOffset={{ y1: -5 }}
                        labelTextStyle={{
                            fontSize: scale(10),
                        }}
                        onEndEditing={(event) => {
                            nameErrorSetter(
                                !event.nativeEvent.text.trim().length
                                    ? 'Email address is required'
                                    : null
                            )
                        }}
                    />
                </View>
            </View>
            <View style={[styles.rowStyle, { ...alignment.MTlarge }]}>
                <View style={styles.w10}>
                    <SimpleLineIcons name="envelope" size={scale(20)} color="black" />
                </View>
                <View style={styles.w90}>
                    <OutlinedTextField
                        ref={emailRef}
                        error={emailError}
                        label={'Email'}
                        labelFontSize={scale(8)}
                        fontSize={scale(12)}
                        maxLength={100}
                        textColor={colors.fontMainColor}
                        baseColor={colors.fontSecondColor}
                        errorColor={colors.textErrorColor}
                        tintColor={!emailError ? colors.activeColor : 'red'}
                        labelOffset={{ y1: -5 }}
                        labelTextStyle={{
                            fontSize: scale(10),
                        }}
                        onEndEditing={(event) => emailValidate()}
                    />
                </View>
            </View>
            <View style={[styles.rowStyle, { ...alignment.MTlarge, ...alignment.MBlarge }]}>
                <View style={styles.w10}>
                    <SimpleLineIcons name="lock" size={scale(20)} color="black" />
                </View>
                <View style={styles.w90}>
                    <OutlinedTextField
                        ref={passwordRef}
                        error={passwordError}
                        label={'Password'}
                        secureTextEntry
                        labelFontSize={scale(8)}
                        fontSize={scale(12)}
                        maxLength={100}
                        textColor={colors.fontMainColor}
                        baseColor={colors.fontSecondColor}
                        errorColor={colors.textErrorColor}
                        tintColor={!passwordError ? colors.activeColor : 'red'}
                        labelOffset={{ y1: -5 }}
                        labelTextStyle={{
                            fontSize: scale(10),
                        }}
                        onEndEditing={(event) => {
                            passwordErrorSetter(
                                !event.nativeEvent.text.trim().length
                                    ? 'Password is required'
                                    : null
                            )
                        }}
                    />
                </View>
            </View>
            <RectButton style={styles.button}
                rippleColor={colors.fontMainColor}
                onPress={() => {
                    if (validate())
                        props.onPress()
                }}>
                {props.loadingIcon ? <Spinner backColor="transparent" spinnerColor={colors.white} />
                    : <TextDefault style={styles.font} textColor={colors.white} H5>{'Submit'}</TextDefault>
                }
            </RectButton>
        </View>
    )
})
export default React.memo(SignUp)