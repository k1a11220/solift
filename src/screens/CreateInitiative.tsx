import { StyleSheet, Text, View } from "react-native";
import InitiativeCard from "../components/InitiativeCard";
import Title from "../components/Title";

const CreateInitiativeScreen = () => {
  return (
    <View style={styles.container}>
      <Title
        title="목표를 알려주세요"
        detail="어떤 목표든 괜찮아요"
        type="detail"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 22,
    paddingRight: 22,
  },
});

export default CreateInitiativeScreen;
