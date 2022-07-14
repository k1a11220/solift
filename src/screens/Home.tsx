import { Button, StyleSheet, Text, View } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>홈 화면</Text>
      <Button
        title="디자인 방법론 공부하기"
        onPress={() => navigation.navigate("ObjectiveDetail")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
