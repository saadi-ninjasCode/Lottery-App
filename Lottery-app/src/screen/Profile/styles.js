import { StyleSheet, Dimensions } from 'react-native'
import { colors, alignment, verticalScale, scale } from '../../utilities'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    backScreen: {
        backgroundColor: colors.mainBackground,
        justifyContent: 'center',
        alignItems: "center"
    },
    formSubContainer: {
        width: '90%',
        backgroundColor: colors.cartContainer,
        alignSelf: 'center',
        shadowOffset: { width: 2, height: 4 },
        shadowColor: colors.shadowColor,
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 15,
        ...alignment.MBlarge,
        ...alignment.MTlarge,
        ...alignment.Psmall
    },
    containerInfo: {
        width: '100%',
        ...alignment.MTsmall,
        ...alignment.PLsmall
    },
    containerHeading: {
        flexDirection: 'row',
        alignContent: 'space-between',
        height: verticalScale(40)
    },
    headingTitle: {
        width: '50%',
        justifyContent: 'center'
    },
    headingLink: {
        width: '50%',
        ...alignment.PRsmall,
        ...alignment.PLlarge
    }, headingButton: {
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        ...alignment.PRsmall
    },
    saveContainer: {
        marginTop: scale(40),
        width: '40%',
        backgroundColor: colors.drawerTitleColor,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    // Model for password changing
    modalContainer: {
        backgroundColor: colors.cartContainer,
        borderRadius: verticalScale(8),
        justifyContent: 'center',
        alignItems: 'center',
        ...alignment.PTmedium,
        ...alignment.PBsmall
    },
    modalContent: {
        width: '90%'
    },
    titleContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    btnContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        ...alignment.MTsmall,
        ...alignment.PxSmall
    }
});
export default styles;