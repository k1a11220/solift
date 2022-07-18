import { StyleSheet, TextInput } from "react-native";

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
    borderColor: "#C3C9D3",
  },
});

export default Input;
