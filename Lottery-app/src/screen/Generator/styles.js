import { StyleSheet } from 'react-native'
import { alignment, colors, scale } from "../../utilities";

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    mainBackground: {
        backgroundColor: colors.mainBackground,
        ...alignment.Pmedium
    },
    box: {
        backgroundColor: 'transparent',
        width: '100%',
        ...alignment.PLlarge,
        ...alignment.PRlarge
    },
    header: {
        width: "80%",
        height: scale(32),
        backgroundColor: colors.white,
        borderWidth: scale(1),
        borderColor: colors.headerBackground,
        borderRadius: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    boxContainer: {
        backgroundColor: colors.headerBackground,
        width: "100%",
        borderRadius: scale(10),
        marginTop: -scale(16),
        alignItems: 'center',
        ...alignment.PBmedium
    },
    boxInfo: {
        width: '100%',
        alignItems: 'center',
        ...alignment.MTlarge,
        ...alignment.PTlarge,
        ...alignment.PLxSmall,
        ...alignment.PRxSmall
    },
    lotteryBalls: {
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    ballContainer: {
        width: scale(30),
        height: scale(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(15),
        ...alignment.MRxSmall,
        ...alignment.MTxSmall
    },
    btn: {
        ...alignment.MTlarge,
        ...alignment.Psmall,
        backgroundColor: colors.drawerTitleColor
    }
});
export default styles
