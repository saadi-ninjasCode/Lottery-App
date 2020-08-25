import { textStyles, alignment, scale } from '../../utilities'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  text: {
    ...textStyles.H5,
    ...alignment.PTxSmall
  },
  position: {
    marginTop: scale(100)
  }
})
export default styles
