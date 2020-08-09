import { StyleSheet } from 'react-native'
import { alignment, colors, scale } from '../../utilities'

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
  },
  titlePasswordText: {
    backgroundColor: colors.cartContainer,
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(7),
    ...alignment.PLxSmall,
    ...alignment.PRxSmall
  }
})

export default styles
