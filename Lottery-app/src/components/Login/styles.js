import { alignment, scale, colors } from "../../utilities";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    w10: {
        width: "10%"
    },
    w90: {
        width: '90%'
    },
    button: {
        backgroundColor: colors.drawerTitleColor,
        width: '50%',
        height: scale(46),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: scale(23)
    },
    socialBtn: {
        height: scale(45),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderRadius: scale(50),
        ...alignment.PLmedium
    },
    googleButton: {
        backgroundColor: colors.google,
    },
    facebookButton: {
        backgroundColor: colors.facebook,
        ...alignment.MTmedium
    },
    font: {
        fontWeight: 'bold',
        textTransform: "uppercase"
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText: {
        width: "80%",
        ...alignment.PLmedium
    },
    btnLogo: {
        width: scale(26),
        height: scale(26),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: scale(13)
    },
});

export default styles