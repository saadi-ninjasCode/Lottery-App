import { StyleSheet } from 'react-native'
import { colors, alignment } from '../../utilities'

const styles = StyleSheet.create({
  headingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.PTlarge,
    ...alignment.PBlarge
  },
  headingLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.horizontalLine 
  }
})

export default styles
