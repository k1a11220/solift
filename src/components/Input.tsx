import { StyleSheet, TextInput } from "react-native";
import { theme } from "../libs/theme";

const Input = (props: any) => {
  return (
    <TextInput
      style={styles.inputContainer}
      placeholder={props.placeholder}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 15,
    fontSize: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.grey200,
    color: theme.colors.grey500,
    fontWeight: "400",
  },
});

export default Input;
