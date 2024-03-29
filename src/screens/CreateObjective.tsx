import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CTA from "../components/Cta";
import Gap from "../components/Gap";
import Input from "../components/Input";
import Title from "../components/Title";
import DatePickerModal from "../components/DatePickerModal";
import { format } from "date-fns";
import { Objective } from "../libs/types";
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../libs/theme";
import { createObjective } from "../utils/firebaseAnalytics";

interface CreateObjectiveScreenProps {
  objective: Objective;
  setObjective: any;
  handleObjective: any;
  latestObjectiveId: number;
  setLatestObjectiveId: any;
  setCurrentRoute: any;
  deviceName: string;
  navigation: NavigationProp<ParamListBase>;
}

const CreateObjectiveScreen = ({
  objective,
  setObjective,
  handleObjective,
  latestObjectiveId,
  setLatestObjectiveId,
  setCurrentRoute,
  deviceName,
  ...props
}: CreateObjectiveScreenProps) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    setCurrentRoute("CreateObjective");
  }, [isFocused]);

  const [date, setDate] = useState(new Date());
  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setObjective({
      ...objective,
      deadline: format(currentDate, "yyyy/MM/dd"),
    });
    setDate(currentDate);
  };

  const onSubmit = () => {
    handleObjective();
    if (objective.name !== null) {
      createObjective(deviceName, objective.name);
    }
    AsyncStorage.setItem(
      "latestObjectiveId",
      JSON.stringify(latestObjectiveId + 1)
    )
      .then(() => {
        setLatestObjectiveId(latestObjectiveId + 1);
      })
      .catch((error) => console.log(error));
    props.navigation.goBack();
  };

  return (
    <>
      <ScrollView
        overScrollMode="never"
        style={styles.container}
        bounces={false}
      >
        <Title
          title="목표와 마감일을 알려주세요"
          detail="여러분이 최종적으로 이루고 싶은 목표에요"
          type="detail"
        />
        <View style={styles.contentContainer}>
          <Input
            placeholder="인문학적 소양 기르기"
            value={objective.name}
            onChangeText={(text: any) =>
              setObjective({
                ...objective,
                name: text,
                id: latestObjectiveId,
                deadline: format(date, "yyyy/MM/dd"),
              })
            }
          />
          <Gap />
          <DatePickerModal date={date} onChange={onChange} />
          <CTA
            label="다음으로"
            type="primary"
            onPress={onSubmit}
            disabled={objective.name ? false : true}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingLeft: 22,
    paddingRight: 22,
  },

  contentContainer: {
    paddingTop: 22,
    flex: 1,
    padding: 0,
  },
});

export default CreateObjectiveScreen;
