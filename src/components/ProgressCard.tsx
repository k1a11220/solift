import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Icon from "../../assets/icons";

const ProgressCard = ({ navigation }: any) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("KeyResultDetail")}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>디자인 서적 4권 읽기</Text>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.detailWrapper}>
          <View style={styles.iconContainer}>
            <Icon.CalendarOutline fillColor={"#8B919E"} />
          </View>
          <Text style={styles.detailValue}>2022/06/20</Text>
        </View>
        <View style={styles.detailWrapper}>
          <View style={styles.iconContainer}>
            <Icon.CheckCircleOutline fillColor={"#8B919E"} />
          </View>
          <Text style={styles.detailValue}>50%</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 22,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#EDEFF1",
    width: "100%",
    marginBottom: 12,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 14,
    height: 14,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderColor: "#EDEFF1",
    color: "#8B919E",
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    color: "#333D4B",
    fontWeight: "600",
  },
  detailContainer: {
    marginTop: 6,
  },
  detailWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  detailValue: {
    marginLeft: 6,
    color: "#8B919E",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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

export default ProgressCard;
