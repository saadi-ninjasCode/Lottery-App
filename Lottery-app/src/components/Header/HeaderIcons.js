import React from 'react'
import {
  Ionicons,
  EvilIcons,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/stack'
import PropTypes from 'prop-types'
import { scale, alignment } from '../../utilities'

function BackButton(props) {
  if (props.icon === 'leftArrow') {
    return (
      <Ionicons
        name="ios-arrow-back"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    )
  } else if (props.icon === 'menu') {
    return (
      <MaterialIcons
        name="menu"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    )
  } else if (props.icon === 'dots') {
    return (
      <MaterialCommunityIcons
        name="dots-vertical"
        size={scale(30)}
        color={props.iconColor}
      />
    )
  } else {
    return (
      <EvilIcons
        name="close"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    )
  }
}

function LeftButton(props) {
  const navigation = useNavigation()
  if (props.icon === 'back') {
    return (
      <HeaderBackButton
        labelVisible={false}
        backImage={() =>
          BackButton({ iconColor: props.iconColor, icon: 'leftArrow' })
        }
        onPress={() => {
          navigation.goBack()
        }}
      />
    )
  } else if (props.icon === 'close') {
    return (
      <HeaderBackButton
        labelVisible={false}
        backImage={() =>
          BackButton({ iconColor: props.iconColor, icon: 'close' })
        }
        onPress={() => {
          navigation.dispatch(state => {
            const routes = state.routes.filter(r => r.name === 'Main')
            return CommonActions.reset({
              ...state,
              routes,
              index: 0
            })
          })
        }}
      />
    )
  } else {
    return (
      <HeaderBackButton
        labelVisible={false}
        backImage={() =>
          BackButton({ iconColor: props.iconColor, icon: 'menu' })
        }
        onPress={() => navigation.toggleDrawer()}
      />
    )
  }
}

function RightButton(props) {
  const navigation = useNavigation()

  if (props.icon === 'dots') {
    return (
      <HeaderBackButton
        labelVisible={false}
        backImage={() => (
          <View style={styles.rightContainer}>
            {BackButton({ iconColor: props.textColor, icon: 'dots' })}
          </View>
        )}
        onPress={togglePassword}
      />
    )
  } else {
    return null
  }
}

BackButton.propTypes = {
  icon: PropTypes.string,
  iconColor: PropTypes.string.isRequired
}
LeftButton.propTypes = {
  icon: PropTypes.string,
  iconColor: PropTypes.string.isRequired
}
RightButton.propTypes = {
  icon: PropTypes.string,
  titlePosition: PropTypes.func,
  modalVisible: PropTypes.func,
  textBackColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired
}

const BackButtonComponent = React.memo(BackButton)
const LeftButtonComponent = React.memo(LeftButton)
const RightButtonComponent = React.memo(RightButton)

export { BackButtonComponent, LeftButtonComponent, RightButtonComponent }
