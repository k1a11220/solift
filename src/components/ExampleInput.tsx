import { StyleSheet, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { setExampleString } from "../redux/first";

const ExampleInput = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.wrap}>
      <TextInput
        placeholder="example input"
        onChangeText={(text: string) => dispatch(setExampleString(text))}
      />
    </View>
  );
};

export default ExampleInput;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
