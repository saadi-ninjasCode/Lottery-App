import React from 'react'
import PropTypes from 'prop-types'
import { LeftButtonComponent } from '../../components'
import { colors, scale } from '../../utilities'

const navigationOptions = props => {
  return {
    title: 'Log in',
    headerRight: null,
    headerStyle: {
      height: scale(120),
      backgroundColor: colors.headerBackground,
      elevation: 0,
      shadowOpacity: 0
    },
    headerLeft: () => <LeftButtonComponent iconColor={props.iconColor} icon="close" />
  }
}
navigationOptions.propTypes = {
  iconColor: PropTypes.string,
}
export default navigationOptions
