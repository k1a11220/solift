import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Icon from "../../assets/icons";

const FloatingBtn = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon.Create fillColor={"#ffffff"} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4191FD",
    justifyContent: "center",
    alignItems: "center",
    width: 53,
    height: 53,
    borderRadius: 53 / 2,
    position: "absolute",
    bottom: 44,
    right: 22,
  },

  iconContainer: {
    width: 24,
    height: 24,
  },
});

export default FloatingBtn;
