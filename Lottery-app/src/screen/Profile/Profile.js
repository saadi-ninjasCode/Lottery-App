import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react';
import { View, KeyboardAvoidingView, Keyboard } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { alignment, colors, scale } from '../../utilities';
import { TextDefault } from '../../components';
import { TextField } from 'react-native-material-textfield'
import ChangePassword from './ChangePassword'
import screenOptions from './screenOptions'
import UserContext from '../../context/User';

function Profile() {
    const navigation = useNavigation()
    const refName = useRef()

    const [nameError, setNameError] = useState('')
    const [toggleView, setToggleView] = useState(true)
    const [modelVisible, setModalVisible] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [margin, marginSetter] = useState(false)
    const { profile } = useContext(UserContext)

    useLayoutEffect(() => {
        navigation.setOptions(
            screenOptions({
                title: profile.name,
                fontColor: colors.fontWhite,
                backColor: colors.headerBackground,
                passChecker: showPass,
                closeIcon: toggleView,
                closeModal: setToggleView,
                modalSetter: setModalVisible,
                passwordButton: setShowPass
            })
        )
    }, [navigation, showPass, toggleView])

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

    function viewHideAndShow() {
        setToggleView(prev => !prev)
    }

    function validateInfo() {
        // clear errors
        setNameError('')

        const name = refName.current.value()

        // if (name === profile.name && phone === profile.phone && phone.length > 0) {
        //     return
        // }
        let res = true
        if (!name.trim()) {
            refName.current.focus()
            setNameError('Name is required')
            res = false
        }
        return res
    }
    function changePasswordTab() {
        return (
            <View style={styles.containerInfo}>
                <TextDefault
                    textColor={colors.fontSecondColor}
                    bold
                    style={{ ...alignment.MBxSmall }}>
                    {'Muhammad Saad Javed'}
                </TextDefault>
                <TextDefault
                    textColor={colors.fontSecondColor}
                    bold
                    style={{ ...alignment.MBxSmall }}>
                    {'saadjaved143@yahoo.com'}
                </TextDefault>
            </View>
        )
    }

    return (
        <>
            <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.flex, styles.backScreen]} >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={[styles.flex, { width: "100%" }]}>
                    <ScrollView
                        style={[styles.flex, {}]}
                        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingBottom: margin ? 20 : 0 }}>
                        <View style={styles.formSubContainer}>
                            <View style={styles.containerHeading}>
                                <View style={styles.headingTitle}>
                                    <TextDefault
                                        textColor={colors.fontMainColor}
                                        bold
                                        H5
                                        style={alignment.PLsmall}>
                                        {'Contact Info'}
                                    </TextDefault>
                                </View>
                                {toggleView && (
                                    <View style={styles.headingLink}>
                                        <TouchableOpacity
                                            activeOpacity={0.3}
                                            style={styles.headingButton}
                                            onPress={viewHideAndShow}>
                                            <TextDefault textColor={colors.drawerTitleColor} bold>
                                                {'Edit'}
                                            </TextDefault>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                            {toggleView ? (
                                changePasswordTab()
                            ) : (
                                    <View style={styles.containerInfo}>
                                        <View>
                                            <View style={{ margin: scale(0) }}></View>
                                            <TextField
                                                label={'Name'}
                                                ref={refName}
                                                error={nameError}
                                                // defaultValue={profile.name}
                                                labelFontSize={scale(12)}
                                                fontSize={scale(12)}
                                                maxLength={20}
                                                textColor={colors.fontMainColor}
                                                baseColor={colors.fontSecondColor}
                                                errorColor={colors.textErrorColor}
                                                tintColor={!nameError ? colors.activeColor : 'red'}
                                                labelOffset={{ y1: -5 }}
                                                labelTextStyle={{
                                                    fontSize: scale(10),
                                                }}
                                                onEndEditing={event => {
                                                    setNameError(
                                                        !event.nativeEvent.text.trim().length
                                                            ? 'Name is required'
                                                            : null
                                                    )
                                                }}
                                            />
                                            <View style={{ ...alignment.MTxSmall }}></View>
                                            <TextField
                                                keyboardType={'email-address'}
                                                label={'Email'}
                                                editable={false}
                                                // defaultValue={profile.email}
                                                labelFontSize={scale(12)}
                                                fontSize={scale(12)}
                                                labelOffset={{ y1: -5 }}
                                                labelTextStyle={{
                                                    fontSize: scale(10),
                                                }}
                                            />
                                        </View>

                                        <TouchableOpacity
                                            // disabled={loadingMutation}
                                            activeOpacity={0.7}
                                            style={styles.saveContainer}
                                            onPress={() => {
                                                validateInfo()
                                            }}>
                                            <TextDefault
                                                textColor={colors.fontWhite}
                                                H4
                                                bold
                                                style={[alignment.MTsmall, alignment.MBsmall]}>
                                                {'Save'}
                                            </TextDefault>
                                        </TouchableOpacity>
                                    </View>
                                )}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
            <ChangePassword
                modalVisible={modelVisible}
                hideModal={() => {
                    setModalVisible(false)
                }}
            />
        </>
    );
}
export default React.memo(Profile)