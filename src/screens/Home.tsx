import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import ProgressCard from "../components/ProgressCard";
import { Objective, ROUTES } from "../libs/types";

const HomeScreen = ({ ...props }) => {
  console.log(props.objectives);
  const navigation = useNavigation<ROUTES>();
  return (
    <View style={styles.container}>
      <Text>홈 화면</Text>
      {props.objectives.map((objective: Objective) => (
        <Button
          key={objective?.id}
          title={
            objective?.name === null ? "오브젝트 이름 없음" : objective?.name
          }
          onPress={() => navigation.navigate("ObjectiveDetail", { objective })}
        />
      ))}
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
