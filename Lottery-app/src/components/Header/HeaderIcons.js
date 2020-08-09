import React, { useState } from 'react'
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/stack'
import PropTypes from 'prop-types'
import { scale, alignment, colors } from '../../utilities'
import Animated, { Value, Easing, Extrapolate, concat, timing } from 'react-native-reanimated'
import { TextDefault } from '../Text'

const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons)

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
      <AnimatedMaterialIcons
        name="close"
        size={scale(30)}
        style={props.rotation && {
          transform: [{ rotate: concat(props.rotation, 'deg') }]
        }}
        color={props.iconColor}
      />
    )
  }
}

function LeftButton(props) {
  const navigation = useNavigation()
  let value = new Value(0)

  const rotation = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 360],
    extrapolate: Extrapolate.CLAMP
  });


  function crossButton() {
    animate()
    setTimeout(() => {
      processing()
    }, 50);
  }

  function animate() {
    timing(value, {
      duration: 100,
      toValue: 1,
      easing: Easing.ease
    }).start()
  }

  function processing() {
    navigation.dispatch(state => {
      const routes = state.routes.filter(r => r.name === 'Main')
      return CommonActions.reset({
        ...state,
        routes,
        index: 0
      })
    })
  }
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
          <View style={styles.leftIconPadding}>
            {BackButton({ iconColor: props.iconColor, icon: 'close', rotation: rotation })}
          </View>
        }
        onPress={() => {
          crossButton()
        }}
      />
    )
  } else if (props.toggle) {
    return (
      <HeaderBackButton
        labelVisible={false}
        backImage={() =>
          <View style={styles.leftIconPadding}>
            {BackButton({ iconColor: props.iconColor, icon: props.toggleValue ? 'leftArrow' : 'close' })}
          </View>
        }
        onPress={() => props.toggleValue ? navigation.goBack() : props.toggleView(prev => !prev)}
      />
    )
  }
  else {
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
  const [password, setPassword] = useState(false)

  function togglePassword() {
    props.titlePosition()
    setPassword(prev => !prev)
  }

  if (props.icon === 'dots') {
    return (
      <View>
        {password ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.rightContainer}
            onPress={props.modalVisible}>
            <Animated.View style={styles.titlePasswordText}>
              <TextDefault textColor={colors.fontMainColor} small bold>
                {'Change Password'}
              </TextDefault>
            </Animated.View>
          </TouchableOpacity>
        ) : (
            <HeaderBackButton
              labelVisible={false}
              backImage={() => (
                <View style={styles.rightContainer}>
                  {BackButton({ iconColor: props.textColor, icon: 'dots' })}
                </View>
              )}
              onPress={togglePassword}
            />
          )}
      </View>
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
