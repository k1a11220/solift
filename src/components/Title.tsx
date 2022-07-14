import { StyleSheet, View } from "react-native";
import { Text } from "react-native-svg";
import * as Icon from "../../assets/icons";

const Title = () => {
  return (
    <View style={styles.container}>
      <Text>디자인 방법론 공부하기</Text>
      <Text>디자인 도서 4권 읽기</Text>
      <View>
        <View style={styles.iconContainer}>
          <Icon.CalendarOutline fillColor={"#8B919E"} />
        </View>
        <Text>2023/02/20</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    width: 17,
    height: 17,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 6,
    backgroundColor: "#C3C9D3",
    marginLeft: 6,
    borderRadius: 6,
  },
  progressBar: {
    backgroundColor: "#4191FD",
    width: "50%",
    height: "100%",
    borderRadius: 6,
  },
});

export default Title;
