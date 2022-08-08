import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Icon from "../../assets/icons";
import { theme } from "../libs/theme";

const ProgressCard = ({ title, date, progress, onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.detailWrapper}>
          <View style={styles.iconContainer}>
            <Icon.CalendarOutline fillColor={theme.colors.grey300} />
          </View>
          <Text style={styles.detailValue}>{date}</Text>
        </View>
        <View style={styles.detailWrapper}>
          <View style={styles.iconContainer}>
            <Icon.CheckCircleOutline fillColor={theme.colors.grey300} />
          </View>
          <Text style={styles.detailValue}>{progress?.toString()}%</Text>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                { maxWidth: `${progress?.toString()}%` },
              ]}
            />
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
    borderColor: theme.colors.grey100,
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
    borderColor: theme.colors.grey100,
    color: theme.colors.grey300,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    color: theme.colors.grey500,
    fontWeight: "600",
    lineHeight: 16 * 1.4,
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
    color: theme.colors.grey300,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 6,
    backgroundColor: theme.colors.grey100,
    marginLeft: 6,
    borderRadius: 6,
  },
  progressBar: {
    backgroundColor: theme.colors.blue500,
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
});

export default ProgressCard;
