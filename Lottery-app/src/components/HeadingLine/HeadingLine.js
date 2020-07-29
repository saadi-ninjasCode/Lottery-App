import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import { colors } from '../../utilities'
import { TextDefault } from '../Text'

const HeadingLine = props => {
  return (
    <View style={styles.headingContainer}>
      <View style={[styles.headingLine, { width: props.lineWidth }]} />
      <TextDefault
        textColor={colors.fontMainColor}
        style={{ width: props.textWidth }}
        H5
        bolder
        B700
        center
        uppercase>
        {props.headerName}
      </TextDefault>
      <View style={[styles.headingLine, { width: props.lineWidth }]} />
    </View>
  )
}

export default HeadingLine
