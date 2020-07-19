import { StyleSheet } from 'react-native'
import { alignment, verticalScale } from '../../utilities'

const styles = StyleSheet.create({
  leftIconPadding: {
    ...alignment.PLsmall,
    ...alignment.PRlarge,
    ...alignment.PTmedium,
    ...alignment.PBmedium
  },
  rightContainer: {
    position: 'relative',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    ...alignment.PLsmall,
    ...alignment.PRsmall
  }
})

export default styles
