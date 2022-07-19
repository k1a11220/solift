import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import CTA from "../components/Cta";
import Gap from "../components/Gap";
import InitiativeCard from "../components/InitiativeCard";
import Input from "../components/Input";
import Title from "../components/Title";

const CreateInitiativeScreen = ({ ...props }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const { handleSubmit, control, watch, getValues } = useForm();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    props.setInitiative({ ...props.initiative, deadline: currentDate });
    setDate(currentDate);
  };

  const onSubmit = () => {
    props.handleInitiative();
    props.navigation.goBack();
  };

  return (
    <ScrollView overScrollMode="never" style={styles.container}>
      <Title
        title="목표와 마감일을 알려주세요"
        detail="어떤 목표든 괜찮아요"
        type="detail"
      />
      <View style={styles.contentContainer}>
        <Input
          placeholder="목표를 입력하세요"
          value={props.initiative.name}
          onChangeText={(text: any) =>
            props.setInitiative({ ...props.initiative, name: text })
          }
        />
        <Gap />
        <RNDateTimePicker
          value={date}
          onChange={onChange}
          mode="date"
          locale="ko-KR"
        />
        <CTA label="다음으로" type="primary" onPress={onSubmit} />
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
