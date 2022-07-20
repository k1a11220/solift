import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EmptyView from "../components/EmptyView";
import ProgressCard from "../components/ProgressCard";
import { Objective, ROUTES } from "../libs/types";

const HomeScreen = ({ ...props }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    props.setCurrentRoute("Home");
  }, [props, isFocused]);
  const navigation = useNavigation<ROUTES>();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={{ height: 36, width: 69 }}
          source={require("../../assets/logo.png")}
        />
      </View>
      {props.objectives.length === 0 ? (
        <EmptyView title="새로운 목표를 만들어봐요" icon="scope" />
      ) : (
        <ScrollView style={styles.cardList}>
          {props.objectives.map((objective: Objective) => (
            <ProgressCard
              key={objective.id}
              title={objective.name}
              date={objective.deadline}
              onPress={() =>
                navigation.navigate("ObjectiveDetail", { objective })
              }
              navigation={navigation}
            />
          ))}
        </ScrollView>
      )}
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
  logoContainer: {
    justifyContent: "center",
    height: 48,
    marginBottom: 12,
  },
  cardList: {},
});

export default HomeScreen;
