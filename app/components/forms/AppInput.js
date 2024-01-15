import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../typo/AppText";
import colors from "../../config/colors";

const AppInput = ({ icon, label, ...props }) => {
  return (
    <View styles={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={10}
          style={styles.icon}
        />
      )}
      {/* Label  */}
      {label && <AppText style={styles.label} text={label} color={"black"} />}
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 10,
    gap: 15,
    borderRadius: 10,
    position: "relative",
    width: "100%",
  },
  input: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    gap: 10,
    borderRadius: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryButton,
  },
  icon: {
    marginRight: 10,
    position: "absolute",
    right: 0,
    top: "50%",
    color: colors.primaryButton,
  },
  label: {
    color: "black",
    textTransform: "capitalize",
  },
});
export default AppInput;
