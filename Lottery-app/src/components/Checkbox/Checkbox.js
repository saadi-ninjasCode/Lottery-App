import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'
import styles from './styles'
import { scale, colors } from '../../utilities'
import PropTypes from 'prop-types'

function Checkbox(props) {
  return (
    <RectButton
      onPress={props.onPress}
      style={[
        styles.mainContainer,
        props.checked
          ? { backgroundColor: colors.checkBoxColor }
          : { backgroundColor: colors.fontWhite }
      ]}>
      {props.checked ? (
        <FontAwesome5
          name="check"
          size={scale(15)}
          color={colors.fontWhite}
        />
      ) : null}
    </RectButton>
  )
}
Checkbox.propTypes = {
  onPress: PropTypes.func,
  checked: PropTypes.bool
}
export default React.memo(Checkbox)
