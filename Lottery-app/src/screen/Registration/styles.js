import { colors, scale, alignment } from "../../utilities";

const { StyleSheet, Dimensions } = require("react-native");
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    font: {
        fontWeight: 'bold'
    },
    backScreen: {
        backgroundColor: colors.loginBackground,
        justifyContent: 'center',
        alignItems: "center"
    },
    container: {
        width: '90%',
        height: height * 0.75,
        backgroundColor: colors.cartContainer,
        alignItems: 'center',
        borderRadius: scale(10),
        ...alignment.Plarge
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    createToggleSwitchStyle: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        width: scale(150),
        height: scale(40),
        borderRadius: scale(20),
        backgroundColor: colors.switchBackground,
        ...alignment.PLlarge,
        ...alignment.PRlarge
    },
    createInsideCircleStyle: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        backgroundColor: colors.activeColor,
        width: scale(75),
        height: '100%',
        borderRadius: scale(30),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 1.5,
    },
    inputContainer: {
        width: "100%",
        height: '100%',
        backgroundColor: 'transparent',
        ...alignment.PTlarge
    },
    btnText: {
        flex: 1,
        ...alignment.PLmedium
    },
    btnLogo: {
        width: scale(26),
        height: scale(26),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: scale(13),
        ...alignment.MLmedium
    },
    socialBtn: {
        height: scale(46),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderRadius: scale(23),
    },
    googleButton: {
        backgroundColor: colors.google,
    },
    facebookButton: {
        backgroundColor: colors.facebook,
        ...alignment.MTmedium
    },
});

export default styles