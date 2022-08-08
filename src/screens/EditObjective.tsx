import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CTA from "../components/Cta";
import Gap from "../components/Gap";
import Input from "../components/Input";
import Title from "../components/Title";
import DatePickerModal from "../components/DatePickerModal";
import { useDate } from "../utils/useDate";
import { getCurrentObjective, sortByLatestId, stringToDate } from "../utils";
import { Objective } from "../libs/types";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface EditObjectiveScreenProps {
  objectives: Objective[];
  setCurrentRoute: any;
  setObjectives: any;
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<{ params: { currentObjectiveId: number } }, "params"> | any;
}

const EditObjectiveScreen = ({
  objectives,
  setCurrentRoute,
  setObjectives,
  ...props
}: EditObjectiveScreenProps) => {
  useEffect(() => {
    setCurrentRoute("EditObjective");
  });

  const currentObjective = getCurrentObjective(
    objectives,
    props.route.params.currentObjectiveId
  );

  const currentDate = stringToDate(currentObjective?.deadline);

  const [date, setDate] = useState(currentDate);
  const [name, setName] = useState(currentObjective?.name);

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onSubmit = () => {
    props.navigation.goBack();
    let filteredObjectives = objectives.filter(
      (objective) => objective.id !== currentObjective?.id
    );
    let edited = [
      ...filteredObjectives,
      { id: currentObjective?.id, name: name, deadline: useDate(date) },
    ];
    AsyncStorage.setItem("objectives", JSON.stringify(sortByLatestId(edited)))
      .then(() => {
        setObjectives(edited);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <ScrollView
        overScrollMode="never"
        bounces={false}
        style={styles.container}
      >
        <Title
          title="목표와 마감일을 알려주세요"
          detail="여러분이 최종적으로 이루고 싶은 목표에요"
          type="detail"
        />
        <View style={styles.contentContainer}>
          <Input
            placeholder={currentObjective?.name}
            value={name}
            onChangeText={(text: any) => {
              setName(text);
              if (currentObjective !== undefined) {
                currentObjective.name = text;
              }
            }}
          />
          <Gap />
          <DatePickerModal date={date} onChange={onChange} />
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
