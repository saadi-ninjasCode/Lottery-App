import { colors, alignment, scale } from "../../../utilities";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "transparent"
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems:"center"
    },
    subConainer: {
        flex: 1,
        justifyContent: 'space-between',
        // ...alignment.MBlarge
    },
    imgContainer: {
        width: scale(70),
        height: scale(70),
        borderRadius: scale(35),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.drawerTitleColor,
        ...alignment.MTlarge
    },
    touchSpace: {
        width: "100%",
        ...alignment.PTlarge,
        ...alignment.PBmedium
    },
    font: {
        fontWeight: '700'
    }
})
export default styles