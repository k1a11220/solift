import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import CTA from "../components/Cta";
import DatePickerModal from "../components/DatePickerModal";
import Gap from "../components/Gap";
import Input from "../components/Input";
import Title from "../components/Title";

const CreateInitiativeScreen = ({ ...props }) => {
  useEffect(() => {
    props.setCurrentRoute("CreateInitiative");
  });
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    props.setInitiative({
      ...props.initiative,
      deadline: currentDate,
      id: props.latestInitiativeId,
      keyResultId: props.currentKeyResultId,
    });
    setDate(currentDate);
  };

  const onSubmit = () => {
    props.handleInitiative();
    props?.setLatestInitiativeId(props?.latestInitiativeId + 1);
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
        <DatePickerModal date={date} onChange={onChange} />
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
