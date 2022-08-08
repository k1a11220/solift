import { StyleSheet, Text, View } from "react-native";
import * as Icon from "../../assets/icons";
import { theme } from "../libs/theme";

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
              <Icon.CalendarOutline fillColor={theme.colors.grey300} />
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
    backgroundColor: theme.colors.grey100,
    borderRadius: 6,
    marginBottom: 12,
  },

  progressBar: {
    backgroundColor: theme.colors.blue500,
    height: "100%",
    borderRadius: 6,
    width: "100%",
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.grey300,
    marginBottom: 6,
    lineHeight: 14 * 1.4,
  },

  title: {
    fontSize: 22,
    color: theme.colors.grey500,
    fontWeight: "bold",
    lineHeight: 22 * 1.4,
  },

  detail: {
    fontSize: 16,
    marginTop: 3,
    color: theme.colors.grey300,
    lineHeight: 16 * 1.4,
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 22,
  },

  date: {
    color: theme.colors.grey300,
  },
});

export default Title;
