import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import styles from './styles'
import { scale, colors } from '../../utilities'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native-gesture-handler'

function Checkbox(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.mainContainer,
        props.checked
          ? { backgroundColor: colors.checkBoxColor }
          : { backgroundColor: colors.white }
      ]}>
      {props.checked ? (
        <FontAwesome5
          name="check"
          size={scale(15)}
          color={colors.fontWhite}
        />
      ) : null}
    </TouchableOpacity>
  )
}
Checkbox.propTypes = {
  onPress: PropTypes.func,
  checked: PropTypes.bool
}
export default React.memo(Checkbox)
