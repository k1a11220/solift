import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CTA from "../components/Cta";
import Gap from "../components/Gap";
import Input from "../components/Input";
import Title from "../components/Title";
import { useDate } from "../utils/useDate";
import Modal from "react-native-modal";
import DatePickerModal from "../components/DatePickerModal";

const CreateObjectiveScreen = ({ ...props }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    props.setCurrentRoute("CreateObjective");
  });

  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    props.setObjective({
      ...props.objective,
      deadline: currentDate.toISOString().split("T")[0].replaceAll("-", "/"),
      id: props.latestObjectiveId,
    });
    setDate(currentDate);
  };

  const onSubmit = () => {
    props.handleObjective();
    props.setLatestObjectiveId(props.latestObjectiveId + 1);
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
            placeholder="목표를 입력하세요"
            value={props.objective.name}
            onChangeText={(text: any) =>
              props.setObjective({ ...props.objective, name: text })
            }
          />
          <Gap />
          <DatePickerModal date={date} onChange={onChange} />
          <CTA label="다음으로" type="primary" onPress={onSubmit} />
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

  modalContainer: {
    flex: 1,
    flexDirection: "column-reverse",
    padding: 0,
  },

  modalContent: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 22,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },

  datePickerContainer: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C3C9D3",
    marginBottom: 16,
  },

  datePickerText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333D4B",
  },
});

export default CreateObjectiveScreen;
