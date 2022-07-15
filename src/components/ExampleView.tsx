import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";

const ExampleView = () => {
  const reduxState = useSelector((state) => state);

  console.log("redux state :", reduxState);

  return (
    <View style={styles.wrap}>
      <Text>{reduxState.first.exampleStringState}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExampleView;
