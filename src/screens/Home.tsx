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
        <View style={styles.emptyContainer}>
          <View style={styles.emptyWrapper}>
            <Image
              style={{ height: 68, width: 68 }}
              source={require("../../assets/scope.png")}
            />
            <Text style={styles.emptyText}>새로운 목표를 만들어봐요</Text>
          </View>
        </View>
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  emptyText: {
    fontSize: 18,
    color: "#333D4B",
    fontWeight: "600",
    marginTop: 24,
  },
  cardList: {},
});

export default HomeScreen;
