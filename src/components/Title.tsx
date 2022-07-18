import { StyleSheet, Text, View } from "react-native";
import * as Icon from "../../assets/icons";

interface TitleProps {
  type: "default" | "detail" | "progress";
  title: string;
  subtitle?: string;
  detail?: string;
  date?: string;
  progress?: number;
}

const Title = ({
  type,
  title,
  subtitle,
  detail,
  date,
  progress,
}: TitleProps) => {
  return (
    <View style={styles.container}>
      {type === "default" ? null : type === "progress" ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {type === "detail" ? <Text style={styles.detail}>{detail}</Text> : null}
      {type === "progress" ? (
        <>
          <View style={styles.dateContainer}>
            <View style={styles.iconContainer}>
              <Icon.CalendarOutline fillColor={"#8B919E"} />
            </View>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { maxWidth: `${progress}%` }]} />
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  iconContainer: {
    width: 17,
    height: 17,
    marginRight: 6,
  },

  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 6,
    backgroundColor: "#EDEFF1",
    borderRadius: 6,
  },

  progressBar: {
    backgroundColor: "#4191FD",
    height: "100%",
    borderRadius: 6,
    width: "100%",
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#8B919E",
    marginBottom: 6,
  },

  title: {
    fontSize: 22,
    color: "#333D4B",
    fontWeight: "bold",
  },

  detail: {
    fontSize: 16,
    marginTop: 6,
    color: "#8B919E",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 22,
  },

  date: {
    color: "#8B919E",
  },
});

export default Title;
