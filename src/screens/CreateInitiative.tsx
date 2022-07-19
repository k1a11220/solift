import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import CTA from "../components/Cta";
import Gap from "../components/Gap";
import InitiativeCard from "../components/InitiativeCard";
import Input from "../components/Input";
import Title from "../components/Title";

const CreateInitiativeScreen = ({ ...props }) => {
  return (
    <ScrollView overScrollMode="never" style={styles.container}>
      <Title
        title="목표를 알려주세요"
        detail="어떤 목표든 괜찮아요"
        type="detail"
      />
      <View style={styles.contentContainer}>
        <Input
          placeholder="목표를 입력하세요"
          value={props.initiative}
          onChangeText={(text) =>
            props.setInitiative({ ...props.initiative, name: text })
          }
        />
        <Gap />
        <CTA
          label="다음으로"
          type="primary"
          onPress={() => props.handleInitiative()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 22,
    paddingRight: 22,
  },

  contentContainer: {
    paddingTop: 22,
    flex: 1,
  },
});

export default CreateInitiativeScreen;
