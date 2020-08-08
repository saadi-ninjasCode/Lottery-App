import { alignment, scale, colors } from "../../utilities";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    w10: {
        width: '10%'
    },
    w90: {
        width: '90%'
    },
    button: {
        backgroundColor: colors.drawerTitleColor,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: scale(50),
        ...alignment.PTmedium,
        ...alignment.PBmedium
    },
    font: {
        fontWeight: 'bold',
        textTransform: "uppercase"
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default styles