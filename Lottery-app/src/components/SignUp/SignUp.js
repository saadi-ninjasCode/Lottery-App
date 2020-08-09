import React, { useState, useRef } from 'react'
import { View } from 'react-native'
import styles from './styles'
import { OutlinedTextField } from 'react-native-material-textfield'
import { colors, scale, alignment } from '../../utilities'
import { TextDefault } from '../Text'
import { SimpleLineIcons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler'
import Spinner from '../Spinner/Spinner'

function SignUp(props) {
    const email = useRef()
    const password = useRef()
    const name = useRef()
    const [nameError, nameErrorSetter] = useState('')
    const [emailError, emailErrorSetter] = useState('')
    const [passwordError, passwordErrorSetter] = useState('')
    return (
        <View style={{ justifyContent: "space-evenly", flex: 1 }}>
            <View style={styles.rowStyle}>
                <View style={styles.w10}>
                    <SimpleLineIcons name="user-follow" size={scale(20)} color="black" />
                </View>
                <View style={styles.w90}>
                    <OutlinedTextField
                        ref={name}
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
                        onBlur={(event) => {
                            nameErrorSetter(
                                !event.nativeEvent.value.trim().length
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
                        ref={email}
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
                        onEndEditing={(event) => {

                            emailErrorSetter(
                                !event.nativeEvent.value.trim().length
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
                onPress={props.onPress}>
                {props.loadingIcon ? <Spinner backColor="rgba(0,0,0,0.1)" spinnerColor={colors.white} />
                    : <TextDefault style={styles.font} textColor={colors.white} H5>{'Submit'}</TextDefault>
                }
            </RectButton>
        </View>
    )
}
export default React.memo(SignUp)