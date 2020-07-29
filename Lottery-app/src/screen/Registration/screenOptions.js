import React from 'react'
import PropTypes from 'prop-types'
import { LeftButtonComponent } from '../../components'

const navigationOptions = props => {
  return {
    title: 'Log in',
    headerRight: null,
    headerLeft: () => <LeftButtonComponent iconColor={props.iconColor} icon="close" />,

  }
}
navigationOptions.propTypes = {
  iconColor: PropTypes.string,
}
export default navigationOptions
