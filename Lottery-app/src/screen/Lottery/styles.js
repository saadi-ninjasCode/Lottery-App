import { StyleSheet } from "react-native";
import { colors, alignment } from "../../utilities";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mainBackground: {
    backgroundColor: colors.mainBackground,
  },
  mainContainer: {
    flexGrow: 1,
    backgroundColor: "transparent",
    ...alignment.PTlarge,
    ...alignment.PBlarge,
  },
  seperator: {
    ...alignment.MTmedium,
  },
  headerStyles: {
    backgroundColor: colors.headerBackground,
    ...alignment.MBmedium,
    ...alignment.PTxSmall,
    ...alignment.PBxSmall,
  },
});
export default styles;
