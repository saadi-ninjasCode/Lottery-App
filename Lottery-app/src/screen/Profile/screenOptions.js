import React from 'react'
import { RightButtonComponent, LeftButtonComponent } from '../../components'
import { textStyles, scale } from '../../utilities'
import PropTypes from 'prop-types'

const navigationOptions = props => ({
  headerRight: () => (
    <RightButtonComponent
      icon="dots"
      modalVisible={() => {
        props.modalSetter(true)
      }}
      titlePosition={() => {
        props.passwordButton(true)
      }}
      textColor={props.fontColor}
      textBackColor={props.backColor}
    />
  ),
  headerTitle: props.title,
  headerTitleAllowFontScaling: true,
  headerTitleAlign: 'Left',
  headerTitleStyle: {
    color: props.fontColor,
    ...textStyles.H4,
    ...textStyles.Bold
  },
  headerTitleContainerStyle: {
    marginLeft: 0,
    marginRight: props.passChecker ? scale(100) : scale(35)
  },
  headerLeft: () => <LeftButtonComponent iconColor={props.fontColor}
    toggle={true}
    toggleValue={props.closeIcon}
    toggleView={(option) => props.closeModal(option)} />
})
navigationOptions.propTypes = {
  modalSetter: PropTypes.func.isRequired,
  passwordButton: PropTypes.func.isRequired,
  fontColor: PropTypes.string,
  backColor: PropTypes.string,
  title: PropTypes.string,
  passChecker: PropTypes.bool.isRequired
}
export default navigationOptions
