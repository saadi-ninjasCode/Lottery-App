import React, { useState, useRef } from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { OutlinedTextField } from 'react-native-material-textfield'
import { colors, scale, alignment } from '../../utilities'
import { TextDefault } from '../Text'
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import HeadingLine from '../HeadingLine/HeadingLine'
import { color } from 'react-native-reanimated'

function Login() {
    const email = useRef()
    const password = useRef()
    const [emailError, emailErrorSetter] = useState('')
    const [passwordError, passwordErrorSetter] = useState('')
    return (
        <View style={[styles.flex, { justifyContent: 'space-between' }]}>
            <View>
                <View style={styles.rowStyle}>
                    <View style={styles.w10}>
                        <SimpleLineIcons name="envelope" size={24} color="black" />
                    </View>
                    <View style={styles.w90}>
                        <OutlinedTextField
                            ref={email}
                            error={emailError}
                            label={'Email'}
                            autoFocus
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
                            onBlur={(event) => {
                                emailErrorSetter(
                                    !event.nativeEvent.text.trim().length
                                        ? 'Email address is required'
                                        : null
                                )
                            }}
                        />
                    </View>
                </View>
                <View style={[styles.rowStyle, { ...alignment.MTlarge, ...alignment.MBlarge }]}>
                    <View style={styles.w10}>
                        <SimpleLineIcons name="lock" size={scale(20)} color="black" />
                    </View>
                    <View style={styles.w90}>
                        <OutlinedTextField
                            ref={password}
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
                            onBlur={(event) => {
                                passwordErrorSetter(
                                    !event.nativeEvent.text.trim().length
                                        ? 'Password is required'
                                        : null
                                )
                            }}
                        />
                    </View>
                </View>
                <View style={{ ...alignment.MTlarge }} />
                <TouchableOpacity style={styles.button}>
                    <TextDefault style={styles.font} textColor={colors.white} H5>{'Login'}</TextDefault>
                </TouchableOpacity>
            </View>
            <View>
                <HeadingLine headerName="Or" textWidth="20%" lineWidth="40%" />
                <TouchableOpacity style={styles.googleButton}>
                    <View style={styles.w10}>
                        <FontAwesome name="google" size={scale(20)} color={colors.white} />
                    </View>
                    <View style={{ width: "80%" }}>
                        <TextDefault textColor={colors.white} H5>{'Sign in with Google'}</TextDefault>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default React.memo(Login)