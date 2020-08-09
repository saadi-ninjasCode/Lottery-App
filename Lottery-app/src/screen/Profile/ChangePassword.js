import React, { useState } from 'react'
import { View, TouchableOpacity, Alert } from 'react-native'
import styles from './styles'
import { TextField } from 'react-native-material-textfield'
import PropTypes from 'prop-types'
import { TextDefault } from '../../components'
import { scale, colors, alignment } from '../../utilities'
import Modal from 'react-native-modal'

function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [oldPasswordError, setOldPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')

  function clearFields() {
    setOldPassword('')
    setNewPassword('')
    setOldPasswordError('')
    setNewPasswordError('')
  }


  return (
    <Modal
      animationType="slide"
      onBackButtonPress={props.hideModal}
      onBackdropPress={props.hideModal}
      isVisible={props.modalVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <TextDefault textColor={colors.fontMainColor} bold H4>
              Change password
            </TextDefault>
          </View>

          <View style={{ ...alignment.MTsmall }}>
            <TextField
              secureTextEntry
              error={oldPasswordError}
              label="Current Password"
              labelFontSize={scale(12)}
              fontSize={scale(12)}
              labelHeight={10}
              textColor={colors.fontMainColor}
              baseColor={colors.fontSecondColor}
              errorColor={colors.textErrorColor}
              tintColor={!oldPasswordError ? colors.activeColor : 'red'}
              labelOffset={{ y1: -5 }}
              labelTextStyle={{
                fontSize: scale(10),
              }}
              onChangeText={setOldPassword}
              onBlur={() => {
                setOldPasswordError(!oldPassword ? 'Password is required' : '')
              }}
            />
          </View>
          <View style={{ ...alignment.MTmedium }}>
            <TextField
              secureTextEntry
              error={newPasswordError}
              label="New Password"
              labelFontSize={scale(12)}
              fontSize={scale(12)}
              labelHeight={10}
              textColor={colors.fontMainColor}
              baseColor={colors.fontSecondColor}
              errorColor={colors.textErrorColor}
              tintColor={!newPasswordError ? colors.activeColor : 'red'}
              labelOffset={{ y1: -5 }}
              labelTextStyle={{
                fontSize: scale(10),
              }}
              onChangeText={setNewPassword}
              onBlur={() => {
                setNewPasswordError(!newPassword ? 'Password is required' : '')
              }}
            />
          </View>

          <TouchableOpacity
            // disabled={loading}
            onPress={() => {
              const newPasswordError =
                newPassword === '' ? 'Password is required' : ''
              const oldPasswordError =
                oldPassword === '' ? 'Password is required' : ''
              setNewPasswordError(newPasswordError)
              setOldPasswordError(oldPasswordError)

              if (
                oldPasswordError.length === 0 &&
                newPasswordError.length === 0
              ) {
                mutate({ variables: { oldPassword, newPassword } })
              }
            }}
            style={[styles.btnContainer]}>
            <TextDefault textColor={colors.fontWhites} bold H5>
              {'Apply'}
            </TextDefault>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

ChangePassword.propTypes = {
  hideModal: PropTypes.func,
  modalVisible: PropTypes.bool.isRequired
}
export default ChangePassword
