import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CTA from "../components/Cta";
import Gap from "../components/Gap";
import Input from "../components/Input";
import Title from "../components/Title";
import DatePickerModal from "../components/DatePickerModal";
import { useDate } from "../utils/useDate";
import { getCurrentObjective, stringToDate } from "../utils";

const EditObjectiveScreen = ({ ...props }) => {
  useEffect(() => {
    props.setCurrentRoute("EditObjective");
  });

  const objective = getCurrentObjective(
    props.route.params.currentObjectiveId,
    props.objectives
  );

  const currentDate = stringToDate(objective?.deadline);

  const [date, setDate] = useState(new Date());
  const [name, setName] = useState(objective?.name);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    objective.deadline = useDate(currentDate);
    setDate(currentDate);
  };

  const onSubmit = () => {
    // props.handleObjective();
    // props.setLatestObjectiveId(props.latestObjectiveId + 1);
    props.navigation.goBack();
  };

  return (
    <>
      <ScrollView overScrollMode="never" style={styles.container}>
        <Title
          title="Objective and deadline"
          detail="어떤 목표든 괜찮아요"
          type="detail"
        />
        <View style={styles.contentContainer}>
          <Input
            placeholder={objective?.name}
            value={objective?.name}
            onChangeText={(text: any) => {
              setName(text);
              objective.name = text;
            }}
          />
          <Gap />
          <DatePickerModal date={currentDate} onChange={onChange} />
          <CTA label="수정하기" type="primary" onPress={onSubmit} />
        </View>
      </ScrollView>
    </>
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
    padding: 0,
  },
});

export default EditObjectiveScreen;
