import { colors, alignment, scale } from "../../../utilities";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    touchSpace: {
        width: "100%",
        // ...alignment.Psmall
        ...alignment.PTsmall,
        ...alignment.PBsmall,
        ...alignment.PRxSmall
    },
    menuRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: 'center',
    },
    leftContainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightContainer: {
        width: '85%',
        justifyContent: 'center'
    },
    font: {
        fontWeight: "400",
        marginLeft: -10
    }
})
export default styles