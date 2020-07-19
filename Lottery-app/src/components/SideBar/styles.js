import { StyleSheet } from "react-native"
import { alignment, colors, scale } from "../../utilities"


const styles = StyleSheet.create({
    font: {
        fontWeight: '400',
        ...alignment.PLmedium
    },
    headerContainer: {
        justifyContent: "center",
        height: scale(200),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.horizontalLine,
        backgroundColor: colors.draweHeader,
        ...alignment.Pmedium
    },
    menuContainer: {
        backgroundColor: 'transparent',
        justifyContent: "space-between",
        ...alignment.PTxSmall
    },
    bottomMenu: {
        borderTopColor: colors.lightHorizontalLine,
        borderTopWidth: StyleSheet.hairlineWidth
    },
    line: {
        ...alignment.MTxSmall,
        ...alignment.MBxSmall,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.lightHorizontalLine
    },
    lotteryContainer: {

    },
    resultContainer: {
        ...alignment.PLlarge
    }
})

export default styles