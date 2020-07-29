import { colors, scale, alignment } from "../../utilities";

const { StyleSheet } = require("react-native");

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
        height: '90%',
        backgroundColor: colors.themeBackground,
        alignItems: 'center',
        borderRadius: scale(10),
        ...alignment.Plarge
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        ...alignment.MBlarge,
        ...alignment.MTlarge
    },
    createToggleSwitchStyle: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: scale(150),
        borderRadius: scale(30),
        backgroundColor: colors.switchBackground,
        ...alignment.Pmedium,
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
        backgroundColor: 'transparent',
        ...alignment.PTlarge
    }
});

export default styles